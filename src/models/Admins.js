// const mongoose = require('mongoose');
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
  dateOfBirth: {
    type: String,
    required: false,
  },
  dni: {
    type: Number,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
});

export default mongoose.model('Admin', adminSchema);
