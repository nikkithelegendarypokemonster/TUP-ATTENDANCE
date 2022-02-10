const converter = require("json-2-csv");
const axios = require("axios");

async function regularCSV(startingDate, userLogs) {
  if (userLogs.length > 0) {
    let json = userLogs;
    let jabsent;
    let csv_temp = {};
    let overload = 0,
      absent = 0;
    let name, period, id;
    id = json[0].employee._id;

    period = new Date(startingDate)
      .toLocaleString()
      .split(",")[0]
      .replaceAll("/", "-");

    name = `${json[0].employee.lastName}, ${json[0].employee.firstName}`; // Name Constructor
    //try to get a json object of all absent(ne) records in previous month
    try {
      jabsent = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/logs/absent/${id}/${period}`
      );
      console.log(jabsent.data.length);
      //set absent days
      absent = jabsent.data.length;

      console.log(
        new Date(period).toLocaleString("default", { month: "long" })
      );

      //set absent days
      //kailangan mabigay is yung full name id, period(start date only),monthOverload,daysAbsentInPreviousMonth(days)
      for (var i = 0; i < json.length; i++) {
        overload += json[i].overloadHours;
      }
      csv_temp.ID = json[0].employee.employeeId;
      csv_temp.Name = name;
      csv_temp.Period =
        new Date(period).toLocaleString("default", { month: "long" }) +
        "/" +
        new Date(period).getFullYear();
      csv_temp.monthOverload = Math.round(overload);
      csv_temp.daysAbsentInPreviousMonth = !absent ? 0 : absent;
      converter.json2csv(csv_temp, (err, csv) => {
        if (err) {
          throw err;
        }
        // download csv
        var link = document.createElement("a");
        link.href = "data:text/csv;charset=utf-8," + encodeURI(csv);
        link.target = "_blank";
        link.download = `${name} - Regular Attendance.csv`;
        link.click();
        console.log(csv);
      });
    } catch (e) {
      console.log(e);
    }
  } else {
    return "Records between the date are empty.";
  }
}

function overloadCSV(startingDate, userLogs) {
  if (userLogs.length > 0) {
    var json = userLogs;
    var csv_temp = {};
    var overload = 0;
    var name;
    // id = json[0].employee.employeeId;

    var period = new Date(startingDate)
      .toLocaleString()
      .split(",")[0]
      .replaceAll("/", "-");
    name = `${json[0].employee.lastName}, ${json[0].employee.firstName}`; //NameConstructor
    //console.log(json);
    //kailangan mabigay is yung full name id at total at strt and end date
    for (var i = 0; i < json.length; i++) {
      overload += json[i].overloadHours;
    }
    csv_temp.ID = json[0].employee.employeeId;
    csv_temp.Name = name;
    csv_temp.Period =
      new Date(period).toLocaleString("default", { month: "long" }) +
      "/" +
      new Date(period).getFullYear();
    csv_temp.monthOverload = Math.round(overload);
    console.log(csv_temp);
    converter.json2csv(csv_temp, (err, csv) => {
      if (err) {
        throw err;
      }
      //download csv
      var link = document.createElement("a");
      link.href = "data:text/csv;charset=utf-8," + encodeURI(csv);
      link.target = "_blank";
      link.download = `${name} - Overload Attendance.csv`;
      link.click();
      console.log(csv);
    });
  } else {
    return "Records between the date are empty.";
  }
}
export { regularCSV, overloadCSV };
