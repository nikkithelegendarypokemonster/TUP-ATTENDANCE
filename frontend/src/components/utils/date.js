function setDateString() {
  //convert timer 00:00:00 into valid date object format 00-00-00
  return new Date().toISOString().replace(/T.*/, "").split("-").join("-");
}
function setCurDateString(date) {
  //convert timer 00:00:00 into valid date object format 00-00-00
  return new Date(date).toISOString().replace(/T.*/, "").split("-").join("-");
}
function setTimeString(time) {
  var date = new Date(time);
  //convert timer 00:00:00 into valid dat object format 00-00-00
  return (
    time.replace(/T.*/, "").split("-").join("-") +
    "T" +
    date.toISOString().substring(11, 19)
  );
}

//function to convert time to decimal (hours . minutes)
function tDec(time) {
  var hr = new Date(time).getHours();
  var min = new Date(time).getMinutes();
  return parseFloat(hr + "." + min);
}
//function to get the difference in between 2 times
function timediff(shr, ehr, smin, emin) {
  var hr, min;

  if (smin > 0 && emin === 0 && shr < ehr) {
    if (Math.abs(smin - 60) > 10) {
      min = Math.abs(smin - 60);
    } else {
      min = "0" + Math.abs(smin - 60);
    }
    hr = Math.abs(ehr - 1 - shr);
  } else {
    hr = Math.abs(shr - ehr);
    if (Math.abs(smin - emin) > 10) {
      min = Math.abs(smin - emin);
    } else {
      min = "0" + Math.abs(smin - emin);
    }
  }
  return parseFloat(hr + "." + min);
}

export { setDateString, setCurDateString, setTimeString, timediff, tDec };
