const Log = require('../models/logModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllLogs = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Log.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const logs = await features.query;

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: logs.length,
    data: {
      logs
    }
  });
});

exports.getLog = catchAsync(async (req, res, next) => {
  const log = await Log.findById(req.params.id);

  if (!log) {
    return next(new AppError('No log found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      log
    }
  });
});

exports.createLog = catchAsync(async (req, res, next) => {
  const newLog = await Log.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      log: newLog
    }
  });
});

exports.updateLog = catchAsync(async (req, res, next) => {
  const log = await Log.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!log) {
    return next(new AppError('No log found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      log
    }
  });
});

exports.deleteLog = catchAsync(async (req, res, next) => {
  const log = await Log.findByIdAndDelete(req.params.id);

  if (!log) {
    return next(new AppError('No log found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});

function converttoDate(date) {
  return new Date(date);
}

exports.getLogAbsent = catchAsync(async (req, res, next) => {
  const currentDate = new Date(req.params.date);
  //get all logs that is absent(ne) and month-1
  Log.find({
    employee: req.params.id,
    status: { $eq: 'Absent(NE)' }
  }).then(resp => {
    //since date is a string we will automate ny pushing objects in array all the converted dates of previous month to it
    const absentArr = [];

    resp.forEach(log => {
      if (
        converttoDate(log.date).getMonth() + 1 ===
        converttoDate(currentDate).getMonth()
      ) {
        absentArr.push(log);
      }
    });
    // for (let i = 0; i < resp.length; i++) {
    //   if (
    //     converttoDate(resp[i].date).getMonth() + 1 ===
    //     converttoDate(currentDate).getMonth()
    //   ) {
    //     absentArr.push(resp[i]);
    //   }
    // }
    res.send(absentArr);
  });
});
