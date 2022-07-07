import mongoose from 'mongoose';

const timesheetsSchema = new mongoose.Schema({
  tasks: [{
    description: {
      type: String,
      required: true,
    },
    workedHours: {
      type: Number,
      required: true,
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
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
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true,
  },
  isDeleted: { type: Boolean, required: true },
});

export default mongoose.model('Time-sheets', timesheetsSchema);
