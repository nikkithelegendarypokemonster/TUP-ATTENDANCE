import React, { useState } from "react";

import {
  Grid,
  Typography,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
  InputAdornment,
  Snackbar,
} from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";

import { format } from "date-fns";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  cardName: {
    color: theme.palette.common.red,
    ...theme.typography.cardName,
  },
  cardTitle: {
    ...theme.typography.cardTitle,
    color: theme.palette.common.red,
    display: "inline-block",
  },
  cardContent: {
    ...theme.typography.cardTitle,
    color: theme.palette.common.darkGray,
    display: "inline-block",
    marginLeft: ".5em",
  },
  gridItem: {
    margin: ".5em",
    minWidth: "200px",
  },
  logColor: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.common.fadedGray,
    },
  },
}));

const LogCard = ({ log }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [alert, setAlert] = useState({ open: false, color: "" });
  const [alertMessage, setAlertMesssage] = useState("");

  async function askOvertimeHandler() {
    try {
      await axios.patch(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/logs/${log._id}`,
        {
          status: "Overtime",
        }
      );
      setAlert({ open: true, color: "#A52439" });
      setAlertMesssage("You asked for an overtime :)");
    } catch (error) {
      setAlert({ open: true, color: "#A52439" });
      setAlertMesssage("Something went wrong! Please try again.");
      console.log(error);
    }
  }

  async function logIssueHandler() {
    try {
      await axios.patch(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/logs/${log._id}`,
        {
          status: "Issue",
          remark: message,
        }
      );
      setAlert({ open: true, color: "#A52439" });
      setAlertMesssage("Your issue was sent!");
      setMessage("");
    } catch (error) {
      setAlert({ open: true, color: "#A52439" });
      setAlertMesssage("Something went wrong! Please try again.");
      console.log(error);
    }
  }

  return (
    <div className={classes.logColor}>
      <Grid className={classes.gridItem} container justify="space-around">
        <Grid item>
          <Grid container direction="column">
            <Grid item className={classes.gridItem}>
              <Typography className={classes.cardTitle}>Date: </Typography>
              <Typography className={classes.cardContent}>
                {format(new Date(log.date), "MM/dd/yy")}
              </Typography>
            </Grid>
            <Grid item className={classes.gridItem}>
              <Typography className={classes.cardTitle}>Status: </Typography>
              <Typography className={classes.cardContent}>
                {log.status}
              </Typography>
            </Grid>
            <Grid item className={classes.gridItem}>
              <Typography className={classes.cardTitle}>Regular: </Typography>
              <Typography className={classes.cardContent}>
                {log.regularHours ? log.regularHours + " hrs" : 0 + " hrs"}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction="column">
            <Grid item className={classes.gridItem}>
              <Typography className={classes.cardTitle}>Time In: </Typography>
              <Typography className={classes.cardContent}>
                {format(new Date(log.timeIn), "hh:mma")}
              </Typography>
            </Grid>
            <Grid item className={classes.gridItem}>
              <Typography className={classes.cardTitle}>Time Out: </Typography>
              <Typography className={classes.cardContent}>
                {format(new Date(log.timeOut), "hh:mma")}
              </Typography>
            </Grid>
            <Grid item className={classes.gridItem}>
              <Typography className={classes.cardTitle}>FTE: </Typography>
              <Typography className={classes.cardContent}>
                {log.fullTimeEquivalent
                  ? log.fullTimeEquivalent + " hrs"
                  : 0 + " hrs"}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction="column">
            <Grid item className={classes.gridItem}>
              <Typography className={classes.cardTitle}>Overload: </Typography>
              <Typography className={classes.cardContent}>
                {log.overloadHours ? log.overloadHours + " hrs" : 0 + " hrs"}
              </Typography>
            </Grid>
            <Grid item className={classes.gridItem}>
              <Typography className={classes.cardTitle}>Overtime: </Typography>
              <Typography className={classes.cardContent}>
                {log.overTime + " hrs"}
              </Typography>
            </Grid>
            {log.remark ? (
              <Grid item className={classes.gridItem}>
                <Typography className={classes.cardTitle}>Remark: </Typography>
                <Typography className={classes.cardContent}>
                  {log.remark}
                </Typography>
              </Grid>
            ) : null}
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction="column">
            {log.feedback ? (
              <Grid item className={classes.gridItem}>
                <Typography className={classes.cardTitle}>Feedback:</Typography>
                <Typography className={classes.cardContent}>
                  {log.feedback}
                </Typography>
              </Grid>
            ) : null}
            <Grid item className={classes.gridItem}>
              <TextField
                label="Write your issue"
                placeholder="Remarks"
                size="small"
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      style={{ cursor: "pointer " }}
                      onClick={() => setOpen(true)}
                    >
                      <AddIcon color="primary" style={{ fontSize: 30 }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item className={classes.gridItem}>
              {log.employee.isAdmin ? (
                <Button
                  color="primary"
                  variant="contained"
                  onClick={askOvertimeHandler}
                >
                  ASK OVERTIME
                </Button>
              ) : null}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Divider />
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" className={classes.cardName}>
          Issue
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Write your issue here. We will send updates immediately.
          </DialogContentText>
          <TextField
            rows={5}
            multiline
            autoFocus
            margin="dense"
            id="message"
            label="Enter your issue..."
            type="message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              logIssueHandler();
              setOpen(false);
            }}
            color="primary"
          >
            Send
          </Button>
        </DialogActions>
      </Dialog>
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
    </div>
  );
};

export default LogCard;
