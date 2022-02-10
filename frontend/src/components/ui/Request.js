import React, { useState } from "react";

import {
  Grid,
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  TextField,
  Dialog,
  DialogContent,
  DialogActions,
  DialogContentText,
  DialogTitle,
  Divider,
  Snackbar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CreateIcon from "@material-ui/icons/Create";
import { getSchedule } from "../utils/sched";

import {
  absentHandler,
  holidayHandler,
  suspensionHandler,
} from "../utils/saveToDb";

const useStyles = makeStyles((theme) => ({
  cardName: {
    color: theme.palette.common.red,
    ...theme.typography.cardName,
  },
  gridItem: {
    margin: ".5em",
  },
  button: {
    paddingLeft: "6em",
    paddingRight: "6em",
    paddingTop: "1em",
    paddingBottom: "1em",
    borderRadius: "1.5em",
    fontSize: "0.860rem",
  },
}));

const Request = ({ user, onAddSuspension, onAddHoliday, onAddAbsent }) => {
  const classes = useStyles();

  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState({ open: false, color: "" });
  const [alertMessage, setAlertMesssage] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Card>
        {/*Card Header*/}
        <Grid container justify="center">
          <Grid item>
            <CardHeader
              avatar={
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  style={{ width: "2.5rem", height: "2.5rem" }}
                  borderRadius="50%"
                  bgcolor="#BBDEFB"
                >
                  <CreateIcon style={{ color: "#2196F3" }} />
                </Box>
              }
              classes={{ title: classes.cardName }}
              styles={classes.cardName}
              title="REQUEST"
            />
          </Grid>
        </Grid>
        {/*Card Content*/}
        <Grid container justify="center" style={{ padding: "1em" }}>
          <Grid item>
            <Button
              disabled={
                user.schedule.length > 0
                  ? !getSchedule(user).hasOwnProperty("start")
                  : false
              }
              classes={{ root: classes.button }}
              variant="contained"
              disableFocusRipple
              disableRipple
              onClick={handleClickOpen}
            >
              Write your remarks here...
            </Button>
          </Grid>
        </Grid>
        <Divider />
        {/*Card Actions*/}
        <CardActions>
          <Grid container justify="center">
            <Grid item className={classes.gridItem}>
              <Button
                disabled={
                  user.schedule.length > 0
                    ? !getSchedule(user).hasOwnProperty("start")
                    : false
                }
                variant="contained"
                color="primary"
                onClick={() =>
                  onAddSuspension(
                    suspensionHandler(user, setAlert, setAlertMesssage)
                  )
                }
              >
                SUSPENSION
              </Button>
            </Grid>
            <Grid item className={classes.gridItem}>
              <Button
                disabled={
                  user.schedule.length > 0
                    ? !getSchedule(user).hasOwnProperty("start")
                    : false
                }
                variant="contained"
                color="primary"
                onClick={() =>
                  onAddHoliday(holidayHandler(user, setAlert, setAlertMesssage))
                }
              >
                HOLIDAY
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" className={classes.cardName}>
          Request
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Write your remarks here. We will send updates immediately.
          </DialogContentText>
          <TextField
            rows={5}
            multiline
            autoFocus
            margin="dense"
            id="message"
            label="Enter your request..."
            type="message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              onAddAbsent(
                absentHandler(message, user, setAlert, setAlertMesssage)
              );
              setMessage("");
              handleClose();
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
    </>
  );
};

export default Request;
