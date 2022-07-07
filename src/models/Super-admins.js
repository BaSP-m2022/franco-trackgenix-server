import mongoose from 'mongoose';

const { Schema } = mongoose;

const superAdminSchema = new Schema(
  {
    password: {
      type: String,
      required: true,
    },
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
    isDeleted: { type: Boolean, required: true },
  },
);

export default mongoose.model('SuperAdmin', superAdminSchema);
