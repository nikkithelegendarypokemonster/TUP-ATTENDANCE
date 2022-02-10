import React from "react";

import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";
import Divider from "@material-ui/core/Divider";

import tup from "../../assets/tup.svg";

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.common.gray,
    width: "100%",
    zIndex: 1302,
    position: "relative",
  },
  footerContainer: {
    width: "25em",
    [theme.breakpoints.down("md")]: {
      width: "20em",
    },
    [theme.breakpoints.down("xs")]: {
      width: "15em",
    },
  },
  footerGridContainer: {
    position: "absolute",
  },
  gridItem: {
    margin: ".5em",
  },
  footerLogo: {
    height: "3em",
  },
  footerTitle: {
    fontFamily: "Roboto",
    fontWeight: "bold",
    color: "white",
    fontSize: ".7em",
    textAlign: "center",
  },
  footerContact: {
    fontFamily: "Roboto",
    fontWeight: "bold",
    color: "white",
    fontSize: ".7em",
    textAlign: "center",
    marginBottom: "0",
  },
  footerParagraph: {
    lineHeight: "1.5",
    fontFamily: "Roboto",
    color: "white",
    fontSize: ".7em",
    textAlign: "center",
    margin: "0",
  },
  footerCopyright: {
    fontFamily: "Roboto",
    color: "white",
    fontSize: "1em",
    [theme.breakpoints.down("md")]: {
      fontSize: ".9em",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: ".8em",
    },
  },
}));

const Footer = () => {
  const styles = useStyles();

  return (
    <footer className={styles.footer}>
      <Hidden mdDown>
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
        >
          <Grid item className={styles.gridItem}>
            <Grid container direction="column" alignItems="center">
              <Grid item>
                <img
                  alt="school-logo"
                  className={styles.footerLogo}
                  src={tup}
                ></img>
              </Grid>
              <Grid item>
                <p className={styles.footerTitle}>
                  Technological University of the Philippines
                </p>
              </Grid>
              <Grid item>
                <p className={styles.footerParagraph}>
                  A premier state university with recognized excellence in
                  engineering and technology
                  <br /> education at par with leading universities in the ASEAN
                  region.
                </p>
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={styles.gridItem}>
            <Grid container direction="column" alignItems="center">
              <Grid item>
                <p className={styles.footerContact}>CONTACT INFORMATION</p>
                <p className={styles.footerParagraph}>
                  For more details, please contact
                </p>
              </Grid>
              <Grid item>
                <p className={styles.footerParagraph}>
                  <br /> Prof. Emma B. Taar Director, Office of Admissions
                  <br /> Ground Floor, Arts and Sciences Bldg., Ayala Blvd.,
                  Ermita, Manila 1000, Philippines
                  <br /> Contact Numbers: +63 (2) 5301.3042 / 5301.3001 local
                  603
                </p>
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={styles.gridItem}>
            <Grid container alignItems="center" direction="column">
              <Grid item>
                <p className={styles.footerTitle}>QUALITY POLICY</p>
              </Grid>
              <Grid item>
                <p className={styles.footerParagraph}>
                  TUP shall commit to provide quality higher and advanced
                  education; conduct relevant
                  <br /> research and extension projects; continually improve
                  its value to customers through
                  <br /> enhancement of personnel competence and effective
                  quality management system
                  <br /> compliant to statutory and regulatory requirements.
                </p>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Divider />
        <Grid container justify="center">
          <Grid item>
            <Grid container direction="column">
              <Grid item>
                <p className={styles.footerCopyright}>
                  © 2021 Technological University of the Philippines - Manila.
                </p>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Hidden>
    </footer>
  );
};

export default Footer;
