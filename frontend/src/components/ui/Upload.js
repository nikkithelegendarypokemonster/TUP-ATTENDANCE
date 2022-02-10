import React, { useState, useEffect } from "react";
import XLSX from "xlsx";
import axios from "axios";
import { Snackbar, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  label: {
    color: theme.palette.common.red,
  },
}));

export default function App() {
  const classes = useStyles();
  const [users, setUsers] = useState();
  const [alert, setAlert] = useState({ open: false, color: "" });
  const [alertMessage, setAlertMesssage] = useState("");

  useEffect(() => {
    if (users) {
      insertToDatabaseHandler(users);
    }
  }, [users]);

  const insertToDatabaseHandler = async (users) => {
    try {
      await axios({
        method: "POST",
        url: `${process.env.REACT_APP_BACKEND_URL}/api/v1/users/`,
        data: users,
      });
      setAlert({ open: true, color: "#A52439" });
      setAlertMesssage("User data uploaded successfully!");
    } catch (err) {
      setAlert({ open: true, color: "#A52439" });
      setAlertMesssage("Something went wrong! Please try again.");
    }
  };

  const isExcel = (file) => {
    const words = file.name.split(".");
    const fileExtension = words[words.length - 1];
    return ["xlsx", "xls", "csv"].includes(fileExtension);
  };

  const filterValues = (keys, values) => {
    let users = [];
    values.forEach((user) => {
      users.push(user);
    });

    users = users.map((user, index) => {
      return {
        [index]: user.map((key, index) => {
          return { [keys[index]]: key };
        }),
      };
    });

    users = users.map((user, index) => {
      return {
        ...user[index],
      };
    });

    users = users.map((user) => {
      return {
        ...user[1],
        ...user[2],
        ...user[3],
        ...user[4],
        ...user[5],
        ...user[6],
        ...user[7],
        ...user[8],
        ...user[9],
        ...user[10],
        ...user[11],
      };
    });

    users = users.map((user) => {
      const overload = JSON.parse(user.overload);
      const schedule = JSON.parse(user.schedule);

      return {
        ...user,
        overload,
        schedule,
      };
    });

    users = users.map((user) => {
      user.overload.forEach((element) => {
        element.forEach((el) => {
          el.start = new Date(el.start?.$date);
          el.end = new Date(el.end?.$date);
          delete el._id;
        });
      });
      user.schedule.forEach((key) => {
        key.start = new Date(key.start?.$date);
        key.end = new Date(key.end?.$date);
        delete key._id;
      });

      user.isPartTime = user.isPartTime === "true" ? true : false;
      user.isAdmin = user.isAdmin === "true" ? true : false;

      return {
        ...user,
      };
    });

    setUsers(users);
  };

  const importEXCEL = (event) => {
    // 1. File Location
    const file = event.target.files[0];

    // 2. Reading file using FileReader
    const reader = new FileReader();
    reader.onload = (event) => {
      // Parse data.

      const binaryString = event.target.result;
      const workBook = XLSX.read(binaryString, { type: "binary" });

      // Getting first sheet
      const workSheetName = workBook.SheetNames[0];
      const workSheet = workBook.Sheets[workSheetName];

      // Converting to Array
      const fileData = XLSX.utils.sheet_to_json(workSheet, { header: 1 });

      // Storing Keys
      const keys = fileData[0];

      // Removing Keys in the Array
      fileData.splice(0, 1);

      filterValues(keys, fileData);
    };

    // If file does not exist, then do nothing.
    if (file) {
      if (isExcel(file)) {
        reader.readAsBinaryString(file);
      } else {
        alert("Invalid file format!");
      }
    } else {
      setUsers([]);
    }
  };

  return (
    <>
      <Button
        classes={{ label: classes.label }}
        component="label"
        variant="contained"
        style={{ margin: ".5em" }}
      >
        Upload
        <input
          hidden
          type="file"
          onChange={(event) => {
            importEXCEL(event);
          }}
        />
      </Button>

      <Snackbar
        open={alert.open}
        ContentProps={{
          style: {
            backgroundColor: alert.color,
          },
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        message={alertMessage}
        autoHideDuration={4000}
        onClose={() => setAlert(false)}
      />
    </>
  );
}
