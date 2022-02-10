import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";

// import Snackbar from "@material-ui/core/Snackbar";
import {
  Grid,
  Typography,
  TextField,
  Paper,
  Button,
  Snackbar,
} from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import useAuth from "./../hooks/useAuth";
import { UserContext } from "../hooks/UserContext";

import hero from "../assets/tulay-logo.png";
import hawk from "../assets/Hawk.png";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: `url(${hero})`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  hawk: {
    height: "23em",
    position: "absolute",
    bottom: "0",
    right: "0",
  },
  paper: {
    margin: theme.spacing(6, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexGrow: 10,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(7),
  },
  submit: {
    margin: theme.spacing(5, 0, 2),
  },
  title: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "500",
    color: theme.palette.common.red,
  },
  header: {
    backgroundColor: theme.palette.common.red,
    padding: "1em",
  },
  headerText: {
    ...theme.typography.title,
    color: "white",
  },
}));

const Login = () => {
  const { user } = useContext(UserContext);
  const classes = useStyles();

  const [alert, setAlert] = useState({ open: false, color: "" });
  const [alertMessage, setAlertMessage] = useState("");
  const [employeeId, setEmployeeId] = useState("");

  const { loginUser } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginUser(employeeId);
      // window.setTimeout(async () => {
      //   setAlert({ open: true, color: "#A52439" });
      //   setAlertMessage("SUCCESSFULLY LOGGED IN");
      // }, 500);
    } catch (error) {
      setAlert({ open: true, color: "#A52439" });
      setAlertMessage(error.response.data.message.toUpperCase());
    }
  };

  if (user) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <>
      <Grid container component="main" className={classes.root}>
        <img src={hawk} alt="tup-trademark" className={classes.hawk} />
        <Grid item xs={false} lg={8} className={classes.image}></Grid>
        <Grid container item direction="column" xs={12} lg={4}>
          <Grid
            container
            alignItems="stretch"
            justify="center"
            className={classes.header}
          >
            <Grid item>
              <Typography className={classes.headerText} align="center">
                Technological University of the Philippines
              </Typography>
            </Grid>
          </Grid>
          <Grid item className={classes.paper}>
            <div component={Paper} className={classes.paper}>
              <Typography className={classes.title} component="h1" variant="h5">
                Online Attendance System
              </Typography>
              <form onSubmit={handleLogin} className={classes.form} noValidate>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Enter ID "
                  type="employeeId"
                  id="employeeId"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  autoComplete="employee-id"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  LOG IN
                </Button>
              </form>
            </div>
          </Grid>
        </Grid>
      </Grid>
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
};

export default Login;
