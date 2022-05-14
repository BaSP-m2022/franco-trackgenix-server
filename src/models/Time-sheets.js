import mongoose from 'mongoose';

const timesheetsSchema = new mongoose.Schema({
  task: {
    type: Array,
  },
  totalHours: {
    type: Number,
  },
  checked: {
    type: Boolean,
    required: true,
  },
  status: {
    type: String,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  projectId: {
    type: String,
  },
  employeeId: {
    type: String,
  },
  managerId: { type: String },
});

export default mongoose.model('Time-sheets', timesheetsSchema);
