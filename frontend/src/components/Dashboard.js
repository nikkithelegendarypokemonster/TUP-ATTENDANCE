import React, { useContext, useState } from "react";

import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { UserContext } from "../hooks/UserContext";

import Profile from "./ui/Profile";
import Request from "./ui/Request";
import Navigation from "./ui/Navigation";
import Header from "./ui/Header";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    width: "100%",
    paddingLeft: "30px",
    paddingRight: "30px",
    marginBottom: "30em",
  },
  gridContainer: {
    marginBottom: "2em",
  },
  circularPosition: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "20em",
  },
}));

const Dashboard = () => {
  const classes = useStyles();

  const [createdLog, setCreatedLog] = useState(null);
  const { user } = useContext(UserContext);

  const addLogHandler = (createdLog) => {
    setCreatedLog((prevLog) => createdLog);
  };

  const suspensionHandler = async (createdLog) => {
    const response = await createdLog;
    setCreatedLog((prevLog) => response);
    // setCreatedLog((prevLog) => createdLog);
  };

  const holidayHandler = async (createdLog) => {
    const response = await createdLog;
    setCreatedLog((prevLog) => response);
  };

  const absentHandler = async (createdLog) => {
    const response = await createdLog;
    setCreatedLog((prevLog) => response);
  };
  let content;

  if (user) {
    content = (
      <>
        <div className={classes.root}>
          <Grid container className={classes.gridContainer} spacing={2}>
            <Grid item xs={12} lg={8}>
              <Profile onAddLog={addLogHandler} user={user}></Profile>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Request
                onAddAbsent={absentHandler}
                onAddSuspension={suspensionHandler}
                onAddHoliday={holidayHandler}
                user={user}
              ></Request>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} lg={12}>
              <Navigation newLog={createdLog}></Navigation>
            </Grid>
          </Grid>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      {content}
    </>
  );
};

export default Dashboard;
