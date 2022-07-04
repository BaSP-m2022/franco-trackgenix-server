import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    dni: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: false,
    },
    firebaseUid: {
      type: String,
      required: true,
    },
  },
);

export default mongoose.model('Employee', employeeSchema);
