import mongoose from 'mongoose';

const timesheetsSchema = new mongoose.Schema({
  tasks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
    required: true,
  }],
  totalHours: {
    type: Number,
  },
  status: {
    type: String,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  employeeId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true,
  }],
});

export default mongoose.model('Time-sheets', timesheetsSchema);
