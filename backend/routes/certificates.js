const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Certificate = require('../models/Certificate');

// @route   GET api/certificates/student
// @desc    Get all certificates for a student
router.get('/student', auth, async (req, res) => {
  if (req.user.role !== 'student') {
    return res.status(403).json({ msg: 'Not authorized' });
  }

  try {
    const certificates = await Certificate.find({ studentId: req.user.id })
      .populate('projectId', ['title'])
      .populate('companyId', ['name']);
      
    res.json(certificates);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
