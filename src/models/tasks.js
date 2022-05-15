import mongoose from 'mongoose';

const { Schema } = mongoose;

const taskSchema = new Schema(
  {
    description: { type: String, required: true },
    workedHours: { type: Number, required: true },
  },
);

export default mongoose.model('Task', taskSchema);
