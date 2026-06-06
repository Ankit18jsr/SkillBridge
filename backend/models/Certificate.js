const mongoose = require('mongoose');

const CertificateSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'project', required: true },
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  domain: { type: String, required: true },
  issuedDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('certificate', CertificateSchema);
