import { getOver, getSchedule } from "./sched";
import { reghrs, ovhrs, fte } from "./calculation";
import { format } from "date-fns";
import axios from "axios";

//function to return estimated hrs like regular hrs and overload hrs same as estimated fte hrs
function reg(user, tin, tout) {
  var sched = getSchedule(user);
  if (sched !== undefined || getOver(user)) {
    //if sched is equal to null
    //convert sched to valid date Object
    tin = new Date(window.localStorage.getItem("Time In")); //window.localStorage.getItem("Time In")
    tout = new Date();

    //regular time  calculations (Completed) for regular or admin
    if (user.isPartTime === false || user.isAdmin === true) {
      var start = new Date(sched.start);
      var end = new Date(sched.end);
      var regular = reghrs(start, end, tin, tout);
    } else {
      regular = 0;
    }
  } else {
    regular = 0;
  }
  //Overload time  calculations(Completed) for regular or partime or regular admin
  if (
    user.isAdmin === false ||
    (user.isAdmin === true && user.isPartTime === false)
  ) {
    var overload = ovhrs(user, tin, tout);
  } else {
    overload = 0;
  }
  if (sched !== undefined) {
    //calculate FTE
    var fte_est = fte(sched);
  } else {
    fte_est = 0;
  }
  return { regular, overload, fte_est };
}

// function to save a normal record
async function save(user, TimeIn, TimeOut) {
  var estimations = reg(user, TimeIn, TimeOut);
  try {
    //Calculate Regular hours and overload if isPartime false
    //calculate overload only if isParttime true
    //calculate regular and OT if is Admin true
    //calculate regular,overload and ot if isadmin true and ispartime false
    let log = {
      date: format(new Date(), "MM/dd/yy"),
      employee: user,
      status: "Valid",
      timeIn: new Date(TimeIn).toISOString(),
      timeOut: new Date(TimeOut).toISOString(),
      fullTimeEquivalent: estimations.fte_est,
      regularHours: estimations.regular,
      overloadHours: estimations.overload,
      overTime: 0,
    };
    return await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/logs`,
      log
    );
  } catch (e) {
    console.log(e);
  }
}

//function to save suspension records counting only overload
async function suspensionHandler(user, setAlert, setAlertMessage) {
  let sched = getSchedule(user);
  //calculate FTE
  let fte_est = fte(sched);
  let tin = new Date(window.localStorage.getItem("Time In")); // window.localStorage.getItem("Time In")
  let tout = new Date();
  try {
    let log = {
      date: format(new Date(), "MM/dd/yy"),
      employee: user,
      status: "Suspension",
      timeIn: new Date(tin).toISOString(),
      timeOut: new Date(tout).toISOString(),
      fullTimeEquivalent: fte_est,
      regularHours: fte_est,
      overloadHours: ovhrs(user, tin, tout),
      overTime: 0,
    };
    clearInterval(window.clock);
    setAlert({ open: true, color: "#A52439" });
    setAlertMessage("Class suspended!");
    return await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/logs`,
      log
    );
  } catch (e) {
    setAlert({ open: true, color: "#A52439" });
    setAlertMessage("Something went wrong! Please try again.");
    console.log(e);
  }
}

// function to save holiday records just set regular hrs to estimated fte hrs
async function holidayHandler(user, setAlert, setAlertMessage) {
  let sched = getSchedule(user);
  //calculate FTE
  let fte_est = fte(sched);
  try {
    let log = {
      date: format(new Date(), "MM/dd/yy"),
      employee: user,
      status: "Holiday",
      fullTimeEquivalent: fte_est,
      timeIn: new Date(),
      timeOut: new Date(),
      regularHours: fte_est,
      overloadHours: 0,
      overTime: 0,
    };
    clearInterval(window.clock);
    setAlert({ open: true, color: "#A52439" });
    setAlertMessage("It's Holiday! :)");
    return await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/logs`,
      log
    );
  } catch (e) {
    setAlert({ open: true, color: "#A52439" });
    setAlertMessage("Something went wrong! Please try again.");
    console.log(e);
  }
}

//function to handle absent
async function absentHandler(message, user, setAlert, setAlertMessage) {
  var sched = getSchedule(user);
  //calculate FTE
  var fte_est = fte(sched);
  //jsut mark this as an issue and set status as absent
  try {
    var log = {
      date: format(new Date(), "MM/dd/yy"),
      employee: user,
      status: "Absent",
      fullTimeEquivalent: fte_est,
      regularHours: 0,
      overloadHours: 0,
      timeIn: 0,
      timeOut: 0,
      overTime: 0,
      remark: message,
    };
    setAlert({ open: true, color: "#A52439" });
    setAlertMessage("Your request was been successfully sent!");
    return await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/logs`,
      log
    );
  } catch (e) {
    setAlert({ open: true, color: "#A52439" });
    setAlertMessage("Something went wrong! Please try again.");
    console.log(e);
  }
}
export { save, suspensionHandler, holidayHandler, absentHandler };
