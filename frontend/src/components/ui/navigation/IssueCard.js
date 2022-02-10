import React from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";

import { format } from "date-fns";

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

const IssueCard = ({ log }) => {
  const classes = useStyles();

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
                {log.regularHours ? log.regularHours + " hrs" : `0 hrs`}
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
                  : `0 hrs`}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction="column">
            <Grid item className={classes.gridItem}>
              <Typography className={classes.cardTitle}>Overload: </Typography>
              <Typography className={classes.cardContent}>
                {log.overloadHours ? log.overloadHours + " hrs" : `0 hrs`}
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
              {/* <TextField
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
              /> */}
            </Grid>
            <Grid item className={classes.gridItem}>
              {/* {log.employee.isAdmin ? (
                <Button
                  color="primary"
                  variant="contained"
                  onClick={askOvertimeHandler}
                >
                  ASK OVERTIME
                </Button>
              ) : null} */}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Divider />
    </div>
  );
};

export default IssueCard;
