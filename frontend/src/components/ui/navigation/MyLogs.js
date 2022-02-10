import React, { useState, useCallback, useEffect, useContext } from "react";

import axios from "axios";

import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { UserContext } from "../../../hooks/UserContext";

// import TableLog from "./TableLog";
import LogCard from "./LogCard";
import Pagination from "./Pagination";

const useStyles = makeStyles((theme) => ({
  gridItem: {
    margin: ".5em",
  },
}));

const MyLogs = (props) => {
  const classes = useStyles();

  const { user } = useContext(UserContext);

  const [beforeSelectedDate, beforeHandleDateChange] = useState(
    new Date("2021-01-01")
  );
  const [afterSelectedDate, afterHandleDateChange] = useState(new Date());

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [logs, setLogs] = useState(null);
  const [results, setResults] = useState([]);

  const fetchLogs = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const log = await axios({
        method: "GET",
        url: `${
          process.env.REACT_APP_BACKEND_URL
        }/api/v1/logs?sort=-updatedAt&employee=${user._id}&date[gte]=${new Date(
          beforeSelectedDate
        )
          .toLocaleString()
          .split(",")[0]
          .replaceAll("/", "-")}&date[lte]=${new Date(afterSelectedDate)
          .toLocaleString()
          .split(",")[0]
          .replaceAll("/", "-")}`,
      });
      setLogs(log.data.data.logs);
    } catch (error) {
      setError(error);
    }
    setIsLoading(false);
  }, [beforeSelectedDate, afterSelectedDate, user._id]);

  //

  useEffect(() => {
    if (props.createdLog) {
      setResults((prevResult) => {
        const updatedResult = [...prevResult];
        updatedResult.unshift(props.createdLog.data.data.log);
        return updatedResult;
      });
    }
    fetchLogs();
  }, [fetchLogs, props.createdLog]);

  let content;

  if (logs) {
    content = (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <>
          <Grid
            container
            justify="center"
            style={{ marginTop: "1em", marginBottom: "1em" }}
          >
            <Grid item className={classes.gridItem}>
              <KeyboardDatePicker
                format="MM/dd/yyyy"
                value={beforeSelectedDate}
                onChange={(newDate) => {
                  beforeHandleDateChange(newDate);
                }}
              />
            </Grid>
            <Grid item className={classes.gridItem}>
              <Typography component="span" variant="h6">
                --
              </Typography>
            </Grid>
            <Grid item className={classes.gridItem}>
              <KeyboardDatePicker
                format="MM/dd/yyyy"
                value={afterSelectedDate}
                onChange={(newDate) => {
                  afterHandleDateChange(newDate);
                }}
              />
            </Grid>
          </Grid>
          <Divider />
          {results.length > 0
            ? results.map((log) => <LogCard key={log._id} log={log} />)
            : null}
          {/* <Pagination results={logs} /> */}
          <Grid container justify="center">
            <Grid item style={{ marginTop: "1em" }}>
              <Pagination results={logs} onSaveResults={setResults} />
            </Grid>
          </Grid>
        </>
      </MuiPickersUtilsProvider>
    );
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = (
      <Grid container justify="center">
        <Grid item>
          <CircularProgress
            className={classes.circularPosition}
            size="10rem"
            color="primary"
          />
        </Grid>
      </Grid>
    );
  }

  return <>{content}</>;
};

export default MyLogs;
