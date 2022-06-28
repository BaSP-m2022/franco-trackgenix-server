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
  password: {
    type: String,
    required: true,
  },
  firebaseUid: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
});

export default mongoose.model('Admin', adminSchema);
