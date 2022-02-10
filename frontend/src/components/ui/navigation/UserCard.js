import React from "react";

import { Typography, Divider, Grid } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  gridItem: {
    margin: "2em",
  },
  employeeName: {
    ...theme.typography.userCard,
    color: theme.palette.common.gray,
    borderBottom: `5px solid ${theme.palette.common.red}`,
    textDecorationColor: theme.palette.common.red,
  },
  logColor: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.common.fadedGray,
    },
  },
}));

const UserCard = ({ user, onSaveUserData }) => {
  const classes = useStyles();

  const toggleButtonHandler = () => {
    onSaveUserData(user);
  };

  return (
    <div className={classes.logColor}>
      <Grid container onClick={toggleButtonHandler}>
        <Grid item className={classes.gridItem}>
          <Typography
            className={classes.employeeName}
          >{`${user.lastName}, ${user.firstName}`}</Typography>
        </Grid>
      </Grid>
      <Divider />
    </div>
  );
};

export default UserCard;
