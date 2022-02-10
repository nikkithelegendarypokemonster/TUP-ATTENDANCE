import React, { useContext } from "react";

import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Header from "../components/ui/Header";
import notFound from "../assets/404.png";
import { UserContext } from "../hooks/UserContext";

const useStyles = makeStyles((theme) => ({
  item: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "2em",
  },
}));

const NotFound = () => {
  const classes = useStyles();
  const { user } = useContext(UserContext);

  return (
    <>
      <Header />
      <Grid container direction="column" justify="center">
        <Grid item className={classes.item}>
          <div>
            <img src={notFound} alt="page-not-found" />
          </div>
        </Grid>
        <Grid item style={{ marginBottom: "2em" }}>
          <Typography variant="h4" align="center">
            Oops! Page not found
          </Typography>
        </Grid>
        <Grid item className={classes.item}>
          {user ? (
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/dashboard"
            >
              Dashboard
            </Button>
          ) : (
            <Button variant="contained" color="primary" component={Link} to="/">
              RETURN TO LOGIN
            </Button>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default NotFound;
