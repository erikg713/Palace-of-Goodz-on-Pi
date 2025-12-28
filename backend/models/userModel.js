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

import db from '../config/db.js'; // Your pg pool connection

export const createUser = async (username, pi_uid, email, role = 'buyer') => {
  const query = `
    INSERT INTO users (username, pi_uid, email, role)
    VALUES ($1, $2, $3, $4)
    ON CONFLICT (pi_uid) DO UPDATE SET username = EXCLUDED.username
    RETURNING *;
  `;
  const result = await db.query(query, [username, pi_uid, email, role]);
  return result.rows[0];
};

export const findUserByPiUid = async (pi_uid) => {
  const result = await db.query('SELECT * FROM users WHERE pi_uid = $1', [pi_uid]);
  return result.rows[0];
};

const User = mongoose.model('User', userSchema);
export default User;
