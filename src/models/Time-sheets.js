import mongoose from 'mongoose';

const timesheetsSchema = new mongoose.Schema({
  tasks: {
    type: Array,
    required: true,
  },
  totalHours: {
    type: Number,
  },
  checked: {
    type: Boolean,
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
  projectId: {
    type: String,
    required: true,
  },
  employeeId: {
    type: String,
    required: true,
  },
  managerId: {
    type: String,
    required: true,
  },
});

export default mongoose.model('Time-sheets', timesheetsSchema);
