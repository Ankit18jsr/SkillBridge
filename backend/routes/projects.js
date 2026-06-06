const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Project = require('../models/Project');
const Certificate = require('../models/Certificate');

// @route   GET api/projects
// @desc    Get all active projects (for students to browse)
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find({ status: 'open' }).populate('companyId', ['name']);
    res.json(projects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/projects/create
// @desc    Create a project (Company/Admin only)
router.post('/create', auth, async (req, res) => {
  if (req.user.role !== 'company' && req.user.role !== 'admin') {
    return res.status(403).json({ msg: 'Not authorized to create a project' });
  }

  const { title, domain, description } = req.body;

  try {
    const newProject = new Project({
      title,
      domain,
      description,
      companyId: req.user.id
    });

    const project = await newProject.save();
    res.json(project);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/projects/:id/complete
// @desc    Mark project as completed and issue certificate (Company only)
router.put('/:id/complete', auth, async (req, res) => {
  if (req.user.role !== 'company') {
    return res.status(403).json({ msg: 'Not authorized' });
  }

  try {
    let project = await Project.findById(req.params.id);

    if (!project) return res.status(404).json({ msg: 'Project not found' });
    if (project.companyId.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    if (!project.assignedStudentId) {
      return res.status(400).json({ msg: 'No student assigned to this project' });
    }

    project.status = 'completed';
    await project.save();

    // Auto-generate Certificate logic
    const newCertificate = new Certificate({
      studentId: project.assignedStudentId,
      projectId: project.id,
      companyId: project.companyId,
      domain: project.domain
    });

    await newCertificate.save();

    res.json({ project, certificate: newCertificate, msg: 'Project completed and certificate generated' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/projects/company
// @desc    Get all projects for a specific company
router.get('/company', auth, async (req, res) => {
  try {
    const projects = await Project.find({ companyId: req.user.id }).populate('assignedStudentId', ['name', 'email']);
    res.json(projects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
