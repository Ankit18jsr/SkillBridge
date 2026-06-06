const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'company', 'admin'], required: true },
  status: { type: String, enum: ['pending', 'active', 'rejected'], default: 'active' },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('user', UserSchema);
