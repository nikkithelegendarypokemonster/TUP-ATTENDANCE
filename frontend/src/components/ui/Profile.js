import React from "react";

import { Grid, Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { format } from "date-fns";

import Timer from "./Timer";
import { getSchedule } from "../utils/sched";

const useStyles = makeStyles((theme) => ({
  cardContainer: {
    width: "100%",
  },
  gridItem: {
    margin: ".5em",
  },
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
  timer: {
    color: theme.palette.common.red,
    fontFamily: "Roboto",
    fontSize: "1.5em",
    fontWeight: "900",
  },
  blue: {
    color: theme.palette.getContrastText("#BBDEFB"),
    backgroundColor: "#BBDEFB",
  },
}));

const Profile = ({ user, onAddLog }) => {
  const classes = useStyles();

  const getInitial = () => {
    const first = user.firstName.slice(0, 1);
    const last = user.lastName.slice(0, 1);
    return `${last}${first}`;
  };

  const type = user.isPartTime ? "Part-Time" : "Regular";

  let schedule = "No Schedule";

  if (user.schedule.length > 0) {
    if (getSchedule(user) && getSchedule(user).hasOwnProperty("start")) {
      schedule = `${format(
        new Date(getSchedule(user).start),
        "hh:mma"
      )} - ${format(new Date(getSchedule(user).end), "hh:mma")}`;
    } else {
      schedule = "No Schedule";
    }
  }

  return (
    <>
      <Card>
        {/* For Card Header */}
        <Grid container justify="center">
          <Grid item>
            <CardHeader
              avatar={<Avatar className={classes.blue}>{getInitial()}</Avatar>}
              classes={{ title: classes.cardName }}
              title={`${user.lastName.toUpperCase()}, ${user.firstName.toUpperCase()}`}
            />
          </Grid>
        </Grid>
        {/* For Card Content */}
        <CardContent>
          <Grid container justify="space-around">
            <Grid item>
              <Grid container direction="column">
                <Grid item>
                  <Typography className={classes.cardTitle}>Type:</Typography>
                  <Typography className={classes.cardContent}>
                    {type}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography className={classes.cardTitle}>Campus:</Typography>
                  <Typography className={classes.cardContent}>
                    {user.campus}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction="column">
                <Grid item>
                  <Typography className={classes.cardTitle}>
                    College:
                  </Typography>
                  <Typography className={classes.cardContent}>
                    {user.college}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography className={classes.cardTitle}>
                    Department:
                  </Typography>
                  <Typography className={classes.cardContent}>
                    {user.department}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction="column">
                <Grid item>
                  <Typography className={classes.cardTitle}>
                    Schedule:
                  </Typography>
                  <Typography className={classes.cardContent}>
                    {schedule}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Timer user={user} onAdd={onAddLog} />
        </CardActions>
      </Card>
    </>
  );
};

export default Profile;
