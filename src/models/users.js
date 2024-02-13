const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
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
  createdAt:{
    type: Date,
    default: Date.now
  }
})

userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Hash the password before saving
userSchema.pre('save', async function(next) {
  const user = this
  if (!user.isModified('password')) return next()

  try {
    const hash = await bcrypt.hash(user.password, 10)
    user.password = hash
    next()
  } catch (error) {
    return next(error)
  }
})

module.exports = mongoose.model('User', userSchema)