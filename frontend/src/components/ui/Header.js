import React, { useEffect, useState, useMemo, useContext } from "react";
import { Link } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/styles";
import { useTheme } from "@material-ui/core/styles";
import { IconButton, SwipeableDrawer } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import { UserContext } from "../../hooks/UserContext";
import useLogout from "../../hooks/useLogout";

import tup from "../../assets/tup.svg";

function ElevationScroll(props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: "2em",
    [theme.breakpoints.down("md")]: {
      marginBottom: "2em  ",
    },
    [theme.breakpoints.down("xs")]: {
      marginBottom: "2em",
    },
  },
  logo: {
    height: "3em",
    [theme.breakpoints.down("md")]: {
      height: "3em",
    },
    [theme.breakpoints.down("xs")]: {
      height: "3em",
    },
  },
  logoContainer: {
    padding: 0,
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  headerTitle: {
    marginLeft: "10px",
    ...theme.typography.title,
    [theme.breakpoints.down("md")]: {
      ...theme.typography.title,
      fontSize: ".9em",
    },
    [theme.breakpoints.down("xs")]: {
      ...theme.typography.title,
      fontSize: ".8em",
    },
  },
  logOut: {
    marginLeft: "auto",
    color: "white",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  badge: {
    marginLeft: "auto",
  },
  textDashboard: {
    display: "inline-block",
    verticalAlign: "middle",
  },
  drawerIconContainer: {
    marginLeft: "auto",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  drawerIcon: {
    height: "45px",
    width: "45px",
  },
  drawer: {
    backgroundColor: theme.palette.common.red,
  },
  drawerItem: {
    ...theme.typography.title,
    color: "white",
    opacity: "0.7",
  },
  drawerItemSelected: {
    opacity: "1",
  },
  appbar: {
    zIndex: theme.zIndex.modal + 1,
  },
}));

const Header = () => {
  const { user } = useContext(UserContext);

  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const styles = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  // const { user } = useContext(UserContext);
  const { logoutUser } = useLogout();

  const [value, setValue] = useState(0);
  const [openDrawer, setOpenDrawer] = useState(false);

  const routes = useMemo(
    () => [
      { name: "Dashboard", link: "/dashboard", activeIndex: 0 },
      { name: "Logout", link: "/", activeIndex: 1 },
    ],
    []
  );

  useEffect(() => {
    [...routes].forEach((route) => {
      switch (window.location.pathname) {
        case `${route.link}`:
          if (value !== route.activeIndex) {
            setValue(route.activeIndex);
          }
          break;
        default:
          break;
      }
    });
  }, [routes, value]);

  // Desktop View
  const tabs = (
    <>
      <div className={styles.headerTitle}>
        Technological University of the Philippines
      </div>
      {/* <Badge className={styles.badge} badgeContent={10} color="primary">
        <MailIcon />
      </Badge> */}
      {user ? (
        <Button disableRipple className={styles.logOut} onClick={logoutUser}>
          Log out
        </Button>
      ) : (
        <Button
          disableRipple
          className={styles.logOut}
          component={Link}
          to="/"
          onClick={() => setValue(1)}
        >
          Log in
        </Button>
      )}
    </>
  );

  // Mobile View
  const drawer = (
    <>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        classes={{ paper: styles.drawer }}
      >
        <div className={styles.toolbarMargin}></div>
        <List disablePadding>
          {/* {routes.map((route) => (
            <ListItem
              divider
              button
              component={Link}
              to={route.link}
              selected={value === route.activeIndex}
              onClick={() => {
                setOpenDrawer(false);
                setValue(route.activeIndex);
              }}
            >
              <ListItemText
                className={
                  value === 0
                    ? `${styles.drawerItem} ${styles.drawerItemSelected}`
                    : styles.drawerItem
                }
                disableTypography
              >
                {route.name}
              </ListItemText>
            </ListItem>
          ))} */}
          <ListItem
            onClick={() => {
              setOpenDrawer(false);
              setValue(0);
            }}
            selected={value === 0}
            divider
            button
            component={Link}
            to="/"
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText
              className={
                value === 0
                  ? `${styles.drawerItem} ${styles.drawerItemSelected}`
                  : styles.drawerItem
              }
              disableTypography
            >
              Dashboard
            </ListItemText>
          </ListItem>
          <ListItem
            onClick={() => {
              setOpenDrawer(false);
              setValue(1);
              logoutUser();
            }}
            selected={value === 1}
            divider
            button
            component={Link}
            to="/"
          >
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText
              className={
                value === 1
                  ? `${styles.drawerItem} ${styles.drawerItemSelected}`
                  : styles.drawerItem
              }
              disableTypography
            >
              Logout
            </ListItemText>
          </ListItem>
        </List>
      </SwipeableDrawer>
      <IconButton
        className={styles.drawerIconContainer}
        onClick={() => setOpenDrawer(!openDrawer)}
        disableRipple
      >
        <MenuIcon className={styles.drawerIcon}></MenuIcon>
      </IconButton>
    </>
  );

  return (
    <>
      <ElevationScroll>
        <AppBar position="fixed" className={styles.appbar}>
          <Toolbar>
            <Button
              component={Link}
              to="/dashboard"
              disableRipple
              onClick={() => setValue(0)}
              className={styles.logoContainer}
            >
              <img alt="school-logo" className={styles.logo} src={tup}></img>
            </Button>
            {matches ? drawer : tabs}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={styles.toolbarMargin} />
    </>
  );
};

export default Header;
