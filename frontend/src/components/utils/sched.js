import { timediff } from "./date.js";

//@Function to get current schedule of the employee.
const getSchedule = (user) => {
  const day = new Date();
  let today = day.getDay() - 1;

  if (Object.keys(user).length !== 0) {
    return user.schedule[today];
  } else {
    return null;
  }
};

//@Function getting overload schedule for the day.
const getOver = (user) => {
  const day = new Date();
  let today = day.getDay() - 1;

  if (Object.keys(user).length !== 0) {
    return user.overload[today];
  } else {
    return null;
  }
};

//function to get gaps of between overload times
function gaps(sched) {
  var hrs;
  //var hr
  if (sched.length === 1) {
    hrs = 0;
  } else {
    for (var i = 0; i < sched.length - 1; i++) {
      hrs = timediff(
        new Date(sched[i].end).getHours(),
        new Date(sched[i + 1].start).getHours(),
        new Date(sched[i].end).getMinutes(),
        new Date(sched[i + 1].start).getMinutes()
      );
      if (hrs !== undefined) {
        //hr+=hrs
        continue;
      }
    }
  }
  if (hrs === undefined) {
    return 0;
  } else {
    return hrs;
  }
}
export { getSchedule, getOver, gaps };
