const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
  },
  avatarUrl: {
    type: String,
    default: ''
  },
  bio: {
    type: String,
    default: '',
    maxlength: 200
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

userSchema.pre('save', async function(next) {

  if(!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
  }
  catch(err) {
    next(err);
  }

});

//pwd->encrypted


userSchema.methods.comparePassword = async function (plainPassword) {
  //console.log(this.password);
  return await bcrypt.compare(plainPassword, this.password);
}

const User = mongoose.model('User', userSchema);
module.exports = User;

