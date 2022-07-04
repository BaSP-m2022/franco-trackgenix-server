import mongoose from 'mongoose';

const superAdminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    firebaseUid: {
      type: String,
      required: true,
    },
  },
);

export default mongoose.model('SuperAdmin', superAdminSchema);
