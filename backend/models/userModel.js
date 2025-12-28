import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false },
}, { timestamps: true });

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypt password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);
export default User;

import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  pi_uid: { type: String, required: true, unique: true }, // The unique ID from Pi SDK
  username: { type: String, required: true },
  email: { type: String, unique: true, sparse: true }, // Sparse allows null for non-verified emails
  role: { 
    type: String, 
    enum: ['buyer', 'creator', 'admin'], 
    default: 'buyer' 
  },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;
