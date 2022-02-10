const mongoose = require('mongoose');

const logSchema = new mongoose.Schema(
  {
    date: Date,
    status: String,
    employee: { type: mongoose.Schema.ObjectId, ref: 'User' },
    timeIn: Date,
    timeOut: Date,
    regularHours: Number,
    overloadHours: Number,
    overTime: Number,
    fullTimeEquivalent: Number,
    remark: String,
    feedback: String,
    updatedBy: String
  },
  {
    timestamps: true
  }
);

logSchema.pre(/^find/, function(next) {
  this.populate('employee');

  next();
});

const Log = mongoose.model('Log', logSchema);

module.exports = Log;
