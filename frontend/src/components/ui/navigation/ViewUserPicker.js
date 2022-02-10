import React, { useState, useCallback, useEffect } from "react";

import axios from "axios";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import {
  Grid,
  Typography,
  Button,
  Divider,
  CircularProgress,
  Snackbar,
} from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";

import UserCard from "./UserCard";
import ViewUserLog from "./ViewUserLog";
import { regularCSV, overloadCSV } from "../../utils/csv";

const useStyles = makeStyles((theme) => ({
  gridItem: {
    margin: ".5em",
  },
}));

const ViewUserPicker = ({ user }) => {
  const classes = useStyles();

  const [alert, setAlert] = useState({ open: false, color: "" });
  const [alertMessage, setAlertMessage] = useState("");
  const [beforeSelectedDate, beforeHandleDateChange] = useState(
    new Date("2021-01-01")
  );
  const [afterSelectedDate, afterHandleDateChange] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [logs, setLogs] = useState(null);

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
      setError(error.message);
    }
    setIsLoading(false);
  }, [beforeSelectedDate, afterSelectedDate, user._id]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  let content;

  if (logs) {
    content = (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container alignItems="center" justify="space-around">
          <Grid item>
            <UserCard user={user} />
          </Grid>
          <Grid item>
            <Grid container>
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
          </Grid>
          <Grid item>
            <Button
              onClick={async () => {
                const response = await regularCSV(beforeSelectedDate, logs);
                if (response) {
                  setAlert({ open: true, color: "#A52439" });
                  setAlertMessage(response);
                }
              }}
              color="primary"
              variant="contained"
              style={{ marginRight: ".5em" }}
            >
              Regular Hours
              <CloudDownloadIcon style={{ marginLeft: ".2em" }} />
            </Button>
            <Button
              onClick={async () => {
                const response = await overloadCSV(beforeSelectedDate, logs);
                if (response) {
                  setAlert({ open: true, color: "#A52439" });
                  setAlertMessage(response);
                }
              }}
              color="primary"
              variant="contained"
            >
              Overload Hours
              <CloudDownloadIcon style={{ marginLeft: ".2em" }} />
            </Button>
          </Grid>
        </Grid>
        <Divider />
        {logs ? <ViewUserLog logs={logs} /> : null}
        <Snackbar
          open={alert.open}
          ContentProps={{
            style: {
              backgroundColor: alert.color,
            },
          }}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          message={alertMessage}
          autoHideDuration={4000}
          onClose={() => setAlert(false)}
        />
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

export default ViewUserPicker;
