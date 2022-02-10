import React, { useContext } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Tabs, Tab, Box, Paper } from "@material-ui/core/";
import MyLogs from "./navigation/MyLogs";
import ViewUsers from "./navigation/ViewUsers";
import Issues from "./navigation/Issues";
import { UserContext } from "../../hooks/UserContext";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={0}>
          <React.Fragment>{children}</React.Fragment>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    height: "59em",
  },
}));

export default function Navigation(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const { user } = useContext(UserContext);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper className={classes.root}>
      <AppBar position="static" color="transparent">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="My Logs" />
          {user.isAdmin ? <Tab label="View Users" /> : null}
          <Tab label="Issues" />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0}>
        {<MyLogs createdLog={props.newLog} />}
      </TabPanel>
      {user.isAdmin ? (
        <TabPanel value={value} index={1}>
          <ViewUsers />
        </TabPanel>
      ) : (
        <TabPanel value={value} index={1}>
          <Issues user={user} />
        </TabPanel>
      )}
      {user.isAdmin ? (
        <TabPanel value={value} index={2}>
          <Issues user={user} />
        </TabPanel>
      ) : null}
    </Paper>
  );
}
