const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true
  },
  dob:{
    type: Date,
  },
  bio:{
    type: String,
    maxlength: 20,
  },
  gender: {
    type: String,
    enum: ['male', 'female', ''],
    default: '',
  },
  createdAt:{
    type: Date,
    default: Date.now
  }
})


module.exports = mongoose.model('User', userSchema)