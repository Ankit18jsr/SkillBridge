const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Application = require('../models/Application');
const Project = require('../models/Project');

// @route   POST api/applications/apply
// @desc    Apply for a project (Student only)
router.post('/apply', auth, async (req, res) => {
  if (req.user.role !== 'student') {
    return res.status(403).json({ msg: 'Only students can apply' });
  }

  const { projectId, coverLetter } = req.body;

  try {
    const existing = await Application.findOne({ studentId: req.user.id, projectId });
    if (existing) {
      return res.status(400).json({ msg: 'Already applied for this project' });
    }

    const application = new Application({
      studentId: req.user.id,
      projectId,
      coverLetter
    });

    await application.save();
    res.json(application);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/applications/student
// @desc    Get applications for student
router.get('/student', auth, async (req, res) => {
  try {
    const applications = await Application.find({ studentId: req.user.id }).populate({
      path: 'projectId',
      populate: { path: 'companyId', select: 'name' }
    });
    res.json(applications);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/applications/:id/accept
// @desc    Accept an application (Company only)
router.put('/:id/accept', auth, async (req, res) => {
  try {
    let application = await Application.findById(req.params.id).populate('projectId');
    
    if (!application) return res.status(404).json({ msg: 'Application not found' });
    
    if (application.projectId.companyId.toString() !== req.user.id) {
       return res.status(401).json({ msg: 'User not authorized' });
    }

    application.status = 'accepted';
    await application.save();

    let project = await Project.findById(application.projectId._id);
    project.assignedStudentId = application.studentId;
    project.status = 'in-progress';
    await project.save();

    res.json(application);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
