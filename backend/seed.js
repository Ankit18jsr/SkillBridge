require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/skillbridge');
    console.log('MongoDB Connected successfully for seeding...');

    // Optionally check if an admin already exists to prevent duplicates on multiple runs
    let admin = await User.findOne({ email: 'admin@skillbridge.com' });
    if (!admin) {
      const bcrypt = require('bcryptjs');
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123', salt);

      admin = new User({
        name: 'Master Admin',
        email: 'admin@skillbridge.com',
        password: hashedPassword,
        role: 'admin'
      });
      await admin.save();
      console.log('Admin user created! Database "skillbridge" has been initialized.');
    } else {
      console.log('Admin already exists. Database "skillbridge" is active.');
    }

    process.exit(0);
  } catch (err) {
    console.error('Error during seeding:', err.message);
    process.exit(1);
  }
};

seedDB();
