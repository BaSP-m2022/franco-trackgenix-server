import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
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
  },
);
export default mongoose.model('Task', taskSchema);
