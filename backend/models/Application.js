const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'project', required: true },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
  coverLetter: { type: String },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('application', ApplicationSchema);
