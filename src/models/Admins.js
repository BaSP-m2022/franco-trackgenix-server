import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  firebaseUid: {
    type: String,
    required: true,
  },
  isDeleted: { type: Boolean, required: true },
});

export default mongoose.model('Admin', adminSchema);
