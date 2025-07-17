const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name : {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false
  },
  role : {
    type: String,
    enum: [
        'customer',
        'admin'
    ],
    required: true
  }
});