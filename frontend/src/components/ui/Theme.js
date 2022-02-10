import { createMuiTheme } from "@material-ui/core/styles";

const red = "#A52439";
const gray = "#3F3F3F";
const blue = "#2196F3";
const fadedBlue = "#BBDEFB";
const darkGray = "#434343";
const fadedGray = "#F4F4F4";

export default createMuiTheme({
  palette: {
    common: {
      red,
      gray,
      blue,
      fadedBlue,
      darkGray,
      fadedGray,
    },
    primary: {
      main: red,
    },
    secondary: {
      main: gray,
    },
  },
  typography: {
    userCard: {
      fontFamily: "Roboto",
      fontSize: "1.5em",
      fontWeight: "500",
    },
    title: {
      fontFamily: "Roboto",
      fontSize: "1em",
      fontWeight: "500",
    },
    cardTitle: {
      fontFamily: "Roboto",
      fontWeight: "bold",
      fontSize: "1.15em",
    },
    cardName: {
      fontFamily: "Roboto",
      fontSize: "1.25em",
      fontWeight: "bold",
    },
    helperText: {
      fontFamily: "Roboto",
      fontSize: "0.85em",
      fontWeight: "bold",
    },
  },
  overrides: {
    MuiSnackbarContent: {
      root: {
        borderRadius: "30px",
      },
      message: {
        margin: "auto",
      },
    },
    MuiTableCell: {
      head: {
        fontWeight: "500",
        color: "white",
      },
    },
    MuiTableRow: {
      head: {
        backgroundColor: red,
      },
    },
    MuiTableSortLabel: {
      root: {
        "&.MuiTableSortLabel-active": { color: "white" },
      },
    },
  },
});
