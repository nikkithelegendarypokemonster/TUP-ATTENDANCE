import { useState, useEffect } from "react";

import { Typography, Button, Grid, Snackbar } from "@material-ui/core/";

import { makeStyles } from "@material-ui/core/styles";
import TimerOffIcon from "@material-ui/icons/TimerOff";
import { getSchedule } from "../utils/sched";

import { save } from "../utils/saveToDb";
import Upload from "./Upload";

const useStyles = makeStyles((theme) => ({
  timer: {
    color: theme.palette.common.red,
    fontFamily: "Roboto",
    fontSize: "1.5em",
    fontWeight: "900",
  },
  gridItem: {
    margin: ".5em",
  },
}));

function Timer(props) {
  const classes = useStyles();

  const [timer, setTimer] = useState(0);
  const [alert, setAlert] = useState({ open: false, color: "" });
  const [alertMessage, setAlertMesssage] = useState("");

  // formula to generate hours mins and secs to display in UI
  let hours = ("0" + Math.floor(timer / 3600)).slice(-2);
  let minutes = ("0" + Math.floor((timer % 3600) / 60)).slice(-2);
  let seconds = ("0" + Math.floor((timer % 3600) % 60)).slice(-2);
  useEffect(() => {
    let current = new Date();
    // record the starting time
    if (window.localStorage.getItem("timer") === "0") {
      window.localStorage.setItem("Time In", current);
    }
    const count = Number(window.localStorage.getItem("timer") || 0);
    //reset timer with timer value in locale storage
    setTimer((prev) => prev + count);
    window.clock = setInterval(countup, 1000);
  }, []);

  useEffect(() => {
    // this is to store timer value in localstorage to prevet restt on refresh
    window.localStorage.setItem("timer", timer);
  }, [timer]);
  function countup() {
    //setinterval to resonsible for countup
    setTimer((prev) => prev + 1);
  }
  async function stopTimerHandler(e) {
    e.preventDefault();
    try {
      let current = new Date();
      //record a blueprint of logs/ Initially its going to construct a fixed log
      //get current time and duration
      window.localStorage.setItem("Time Out", current);
      //console.log(window.localStorage.getItem("Time In"));
      const newLog = await save(
        props.user,
        window.localStorage.getItem("Time In"),
        window.localStorage.getItem("Time Out")
      );
      clearInterval(window.clock);
      setTimer(0);
      props.onAdd(newLog);
      setAlert({ open: true, color: "#A52439" });
      setAlertMesssage("Time out successfully!");
    } catch (e) {
      setAlert({ open: true, color: "#A52439" });
      setAlertMesssage("Something went wrong! Please try again.");
      console.log(e);
    }
  }

  return (
    <>
      <Grid container justify="center">
        <Grid item className={classes.gridItem}>
          <Typography
            className={classes.timer}
          >{`${hours}:${minutes}:${seconds}`}</Typography>
        </Grid>
        <Grid item className={classes.gridItem}>
          <Button
            disabled={
              props.user.schedule.length > 0
                ? !getSchedule(props.user).hasOwnProperty("start")
                : false
            }
            onClick={stopTimerHandler}
            variant="contained"
            color="primary"
          >
            <TimerOffIcon style={{ marginRight: ".2em" }} />
            TIME OUT
          </Button>
        </Grid>
        {props.user.isAdmin ? (
          <Grid item>
            <Upload />
          </Grid>
        ) : null}
      </Grid>
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
    </>
  );
}

export default Timer;
