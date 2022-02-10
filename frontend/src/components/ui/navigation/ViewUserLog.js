import React, { useState } from "react";

import { format } from "date-fns";

import EnhancedTable from "./EnhancedTable";

function createData(
  date,
  status,
  timeIn,
  timeOut,
  regularHours,
  fullTimeEquivalent,
  overloadHours,
  overTime,
  _id
) {
  return {
    date,
    status,
    timeIn,
    timeOut,
    regularHours,
    fullTimeEquivalent,
    overloadHours,
    overTime,
    _id,
  };
}

const ViewUserLog = ({ logs }) => {
  const [rows, setRows] = useState(
    logs.map((log) =>
      createData(
        format(new Date(log.date), "MM/dd/yy"),
        log.status,
        format(new Date(log.timeIn), "HH:mm:ss"),
        format(new Date(log.timeOut), "HH:mm:ss"),
        log.regularHours,
        log.fullTimeEquivalent,
        log.overloadHours,
        log.overTime,
        log._id
      )
    )
  );

  return (
    <>
      <EnhancedTable rows={rows} setRows={setRows} />
    </>
  );
};

export default ViewUserLog;
