import mongoose from 'mongoose';

const { Schema } = mongoose;

const employeeSchema = new Schema({
  rate: {
    type: Number,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});

const projectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  employees: [employeeSchema],
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: false,
  },
});

export default mongoose.model('Project', projectSchema);
