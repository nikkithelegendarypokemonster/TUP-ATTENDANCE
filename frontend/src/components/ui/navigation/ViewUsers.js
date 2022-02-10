import React, { useState, useEffect, useCallback } from "react";

import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
// import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Grid } from "@material-ui/core";
import axios from "axios";

import UserCard from "./UserCard";
import ViewUserPicker from "./ViewUserPicker";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1, 4),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(1),
  },
  selectHelperText: {
    ...theme.typography.helperText,
    color: theme.palette.primary.main,
  },
}));

const ViewUsers = () => {
  const classes = useStyles();

  const [showUserPicker, setShowUserPicker] = useState(false);
  const [users, setUsers] = useState(null);
  const [user, setUser] = useState(null);

  const [type, setType] = useState("");
  const [department, setDepartment] = useState("");
  const [college, setCollege] = useState("");
  const [campus, setCampus] = useState("");

  const [typeOptions, setTypeOptions] = useState([]);
  const [collegeOptions, setCollegeOptions] = useState([]);
  const [campusOptions, setCampusOptions] = useState([]);
  const [departmentOptions, setDepartmentOptions] = useState([]);

  let userPicker;
  const saveUserDataHandler = (user) => {
    setShowUserPicker((prevState) => !prevState);
    setUser(user);
  };

  if (user) {
    userPicker = <ViewUserPicker user={user} />;
  }

  const userReport = useCallback(
    async (mounted) => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/v1/users/?isAdmin=${
            type === "Admin" ? true : type === "Regular" ? false : false
          }&isPartTime=${
            type === "Part-Time" ? true : type === "Admin" ? false : false
          }&department=${department}&college=${college}&campus=${campus}&fields=employeeId,firstName,lastName&sort=lastName`
        );
        if (mounted) {
          setUsers(response.data.data.users);
        }
      } catch (err) {
        console.log(err);
      }
    },
    [type, campus, college, department]
  );

  useEffect(() => {
    let mounted = true;
    let department = [],
      college = [],
      campus = [],
      type = [],
      temp = [];

    async function getFilters() {
      try {
        const {
          data: {
            data: { users },
          },
        } = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/v1/users/?fields=department,college,campus,isAdmin,isPartTime`
        );
        if (mounted) {
          users.forEach((user) => {
            user.isAdmin && !user.isPartTime
              ? type.push("Admin")
              : !user.isAdmin && !user.isPartTime
              ? type.push("Regular")
              : type.push("Part-Time");
            department.push(user.department);
            campus.push(user.campus);
            college.push(user.college);
          });
          temp = new Set(type);
          setTypeOptions([...temp]);
          temp = new Set(department);
          setDepartmentOptions([...temp]);
          temp = new Set(campus);
          setCampusOptions([...temp]);
          temp = new Set(college);
          setCollegeOptions([...temp]);
        }
      } catch (err) {
        console.log(err);
      }
    }

    getFilters();
    userReport(mounted);

    return () => {
      mounted = false;
    };
  }, [userReport]);

  let userCard;

  if (users) {
    userCard =
      users.length > 0
        ? users.map((user) => (
            <UserCard
              onSaveUserData={saveUserDataHandler}
              key={user._id}
              user={user}
            />
          ))
        : null;
  }

  return (
    <>
      <Grid
        container
        justify="center"
        style={{ marginTop: "1em", marginBottom: "1em" }}
      >
        <Grid item>
          <Grid container>
            <Grid item style={{ minWidth: "200px  " }}>
              <FormControl className={classes.formControl}>
                <Select
                  displayEmpty
                  labelId="type"
                  id="type"
                  value={type}
                  renderValue={type.length > 0 ? undefined : () => "Type"}
                  onChange={(event) => {
                    setType(event.target.value);
                  }}
                >
                  {typeOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText classes={{ root: classes.selectHelperText }}>
                  TYPE
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item style={{ minWidth: "200px  " }}>
              <FormControl className={classes.formControl}>
                <Select
                  displayEmpty
                  labelId="department"
                  id="department"
                  value={department}
                  onChange={(event) => {
                    setDepartment(event.target.value);
                  }}
                  renderValue={
                    department.length > 0 ? undefined : () => "Department"
                  }
                >
                  {departmentOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText classes={{ root: classes.selectHelperText }}>
                  DEPARTMENT
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item style={{ minWidth: "200px  " }}>
              <FormControl className={classes.formControl}>
                <Select
                  displayEmpty
                  labelId="college"
                  id="college"
                  value={college}
                  renderValue={college.length > 0 ? undefined : () => "College"}
                  onChange={(event) => setCollege(event.target.value)}
                >
                  {collegeOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText classes={{ root: classes.selectHelperText }}>
                  BUILDING
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item style={{ minWidth: "200px" }}>
              <FormControl className={classes.formControl}>
                <Select
                  displayEmpty
                  labelId="branch"
                  id="branch"
                  value={campus}
                  renderValue={campus.length > 0 ? undefined : () => "Campus"}
                  onChange={(event) => setCampus(event.target.value)}
                >
                  {campusOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText classes={{ root: classes.selectHelperText }}>
                  BRANCH
                </FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        {/* <Grid item style={{ width: "20em" }}>
          <Grid item>
            <TextField label="Search name..." fullWidth></TextField>
          </Grid>
        </Grid> */}
      </Grid>
      <Divider />
      {!showUserPicker && userCard}
      {showUserPicker && userPicker}
    </>
  );
};

export default ViewUsers;
