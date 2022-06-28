import mongoose from 'mongoose';

const usersSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  firebaseUid: { type: String, required: true },
  token: { type: String },
});

export default mongoose.model('User', usersSchema);
