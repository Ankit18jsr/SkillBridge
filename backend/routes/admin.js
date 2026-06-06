const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const Project = require('../models/Project');
const Application = require('../models/Application');

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ msg: 'Access denied: Admin only' });
  }
};

// @route   GET api/admin/users
// @desc    Get all users
router.get('/users', auth, isAdmin, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/admin/users/:id/status
// @desc    Update a user's status (Accept/Reject)
router.put('/users/:id/status', auth, isAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    if (!['pending', 'active', 'rejected'].includes(status)) {
      return res.status(400).json({ msg: 'Invalid status' });
    }
    
    // We shouldn't block the master admin for this example, but standard precaution
    if (req.params.id === req.user.id) {
       return res.status(400).json({ msg: 'Cannot change your own status!' });
    }

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    user.status = status;
    await user.save();
    
    res.json({ msg: 'User status updated', user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/admin/projects
// @desc    Get all projects
router.get('/projects', auth, isAdmin, async (req, res) => {
  try {
    const projects = await Project.find().populate('companyId', 'name email');
    res.json(projects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/admin/applications
// @desc    Get all applications
router.get('/applications', auth, isAdmin, async (req, res) => {
  try {
    const applications = await Application.find()
      .populate('studentId', 'name email')
      .populate({
        path: 'projectId',
        populate: { path: 'companyId', select: 'name' }
      });
    res.json(applications);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
