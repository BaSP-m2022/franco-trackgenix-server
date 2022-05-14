import mongoose from 'mongoose';

const { Schema } = mongoose;

const projectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  employees: [{
    employeeId: {
      type: String,
      required: true,
    },
    rate: {
      type: Number,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
  }],
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
  },
});

export default mongoose.model('Project', projectSchema);
