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
  FormControl,
  Select,
  MenuItem,
  InputAdornment,
  Snackbar,
} from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";

// Icons
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";

// Picker
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import { TimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { format } from "date-fns";

// HTTP Request
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  cardTitle: {
    ...theme.typography.cardTitle,
    color: theme.palette.common.red,
    display: "inline-block",
    marginRight: ".5em",
  },
  cardContent: {
    ...theme.typography.cardTitle,
    color: theme.palette.common.darkGray,
    display: "inline-block",
  },
  cardName: {
    color: theme.palette.common.red,
    ...theme.typography.cardName,
  },
  gridItem: {
    margin: ".5em",
    minWidth: "200px",
  },
  input: {
    padding: "0 0 5px",
  },
  logColor: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.common.fadedGray,
    },
  },
}));

const IssueCardAdmin = ({ log, onDeleteLog, onFixLog }) => {
  const classes = useStyles();

  const [alert, setAlert] = useState({ open: false, color: "" });
  const [alertMessage, setAlertMesssage] = useState("");
  const [regular, setRegular] = useState(log.regularHours);
  const [overload, setOverload] = useState(log.overloadHours);
  const [overtime, setOvertime] = useState(log.overTime);
  const [status, setStatus] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [timeInSelectedDate, timeInHandleDateChange] = useState(
    new Date(log.timeIn)
  );
  const [timeOutSelectedDate, timeOutHandleDateChange] = useState(
    new Date(log.timeOut)
  );

  async function deleteLogHandler() {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/logs/${log._id}`
      );
      setAlert({ open: true, color: "#A52439" });
      setAlertMesssage("Log deleted!");
      window.setTimeout(() => {
        onDeleteLog(log._id);
      }, 500);
    } catch (error) {
      setAlert({ open: true, color: "#A52439" });
      setAlertMesssage("Something went wrong! Please try again.");
      console.log(error);
    }
  }

  async function feedbackHandler() {
    try {
      await axios.patch(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/logs/${log._id}`,
        {
          feedback: message,
        }
      );
      setAlert({ open: true, color: "#A52439" });
      setAlertMesssage("Feedback was sent!");
      setMessage("");
    } catch (error) {
      setAlert({ open: true, color: "#A52439" });
      setAlertMesssage("Something went wrong! Please try again.");
      console.log(error);
    }
  }

  async function markFixedHandler(props) {
    try {
      await axios.patch(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/logs/${log._id}`,
        {
          status,
          timeIn: timeInSelectedDate,
          timeOut: timeOutSelectedDate,
          regularHours: regular,
          overloadHours: overload,
          overTime: overtime,
        }
      );
      setAlert({ open: true, color: "#A52439" });
      setAlertMesssage("Issue was been fixed");
    } catch (error) {
      setAlert({ open: true, color: "#A52439" });
      setAlertMesssage("Something went wrong! Please try again.");
      console.log(error);
    }
  }

  const statusOptions = [
    "Valid",
    "Absent(E)",
    "Absent(NE)",
    "Overtime",
    "Issue",
  ];

  return (
    <div className={classes.logColor}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid className={classes.gridItem} container justify="space-around">
          <Grid item style={{ paddingRight: "2em" }}>
            <Grid container direction="column">
              <Grid item className={classes.gridItem}>
                <Typography className={classes.cardTitle}>Date: </Typography>
                <Typography className={classes.cardContent}>
                  {format(new Date(log.date), "MM/dd/yy")}
                </Typography>
              </Grid>
              <Grid item className={classes.gridItem}>
                <Typography className={classes.cardTitle}>
                  Employee:{" "}
                </Typography>
                <Typography
                  className={classes.cardContent}
                >{`${log.employee.firstName} ${log.employee.lastName}`}</Typography>
              </Grid>
              <Grid item className={classes.gridItem}>
                <Typography className={classes.cardTitle}>Status: </Typography>
                <FormControl className={classes.formControl}>
                  {/* <InputLabel id="status">{log.status}</InputLabel> */}
                  <Select
                    inputProps={{
                      className: classes.input,
                    }}
                    renderValue={
                      status.length > 0 ? undefined : () => `${log.status}`
                    }
                    displayEmpty
                    labelId="status"
                    id="status"
                    value={status}
                    onChange={(event) => setStatus(event.target.value)}
                  >
                    {/* {<MenuItem value="">{log.status}</MenuItem>} */}
                    {statusOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container direction="column">
              <Grid item className={classes.gridItem}>
                <Typography className={classes.cardTitle}>Regular: </Typography>
                <TextField
                  value={regular}
                  onChange={(event) => {
                    setRegular(event.target.value);
                  }}
                  id="regularHours"
                  type="number"
                  inputProps={{
                    min: "0.0",
                    max: "24.0",
                    step: ".01",
                    className: classes.input,
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item className={classes.gridItem}>
                <Typography className={classes.cardTitle}>Time In: </Typography>
                <TimePicker
                  inputProps={{
                    className: classes.input,
                  }}
                  value={timeInSelectedDate}
                  onChange={timeInHandleDateChange}
                />
              </Grid>
              <Grid item className={classes.gridItem}>
                <Typography className={classes.cardTitle}>Time Out:</Typography>
                <TimePicker
                  inputProps={{
                    className: classes.input,
                  }}
                  value={timeOutSelectedDate}
                  onChange={timeOutHandleDateChange}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container direction="column">
              <Grid item className={classes.gridItem}>
                <Typography className={classes.cardTitle}>FTE: </Typography>
                <Typography className={classes.cardContent}>
                  {log.fullTimeEquivalent
                    ? log.fullTimeEquivalent + " hrs"
                    : "0 hrs"}
                </Typography>
              </Grid>
              <Grid item className={classes.gridItem}>
                <Typography className={classes.cardTitle}>Overload:</Typography>
                <TextField
                  value={overload}
                  onChange={(event) => {
                    setOverload(event.target.value);
                  }}
                  id="regularhours"
                  type="number"
                  inputProps={{
                    min: "0.0",
                    max: "24.0",
                    step: ".01",
                    className: classes.input,
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item className={classes.gridItem}>
                <Typography className={classes.cardTitle}>Overtime:</Typography>
                <TextField
                  value={overtime}
                  onChange={(event) => {
                    setOvertime(event.target.value);
                  }}
                  id="overtime"
                  type="number"
                  inputProps={{
                    min: "0.0",
                    max: "24.0",
                    step: ".01",
                    className: classes.input,
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container direction="column">
              {/* <Grid item className={classes.gridItem}>
                <Typography className={classes.cardTitle}>Feedback:</Typography>
                <Typography className={classes.cardContent}>
                  {log.feedback}
                </Typography>
              </Grid> */}
              <Grid item className={classes.gridItem}>
                <Typography className={classes.cardTitle}>Remark: </Typography>
                <Typography className={classes.cardContent}>
                  {log.remark}
                </Typography>
              </Grid>
              <Grid item className={classes.gridItem}>
                <TextField
                  label="Write your feedback"
                  placeholder="Feedback"
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
                <Button
                  color="primary"
                  variant="contained"
                  onClick={markFixedHandler}
                >
                  MARK AS FIXED
                </Button>
                <Button onClick={deleteLogHandler}>
                  <DeleteIcon color="primary" />
                </Button>
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
            Feedback
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Write your feedback here. Maximum of one sentence only
            </DialogContentText>
            <TextField
              rows={5}
              multiline
              autoFocus
              margin="dense"
              id="message"
              label="Enter your feedback"
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
                feedbackHandler();
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
      </MuiPickersUtilsProvider>
    </div>
  );
};

export default IssueCardAdmin;
