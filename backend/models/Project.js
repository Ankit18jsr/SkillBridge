const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  domain: { type: String, required: true },
  description: { type: String, required: true },
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  status: { type: String, enum: ['open', 'in-progress', 'completed'], default: 'open' },
  assignedStudentId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('project', ProjectSchema);
