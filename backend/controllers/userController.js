const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// Admin Login
exports.login = async (req, res) => {
  const { username, password } = req.body;
  console.log(username,password)

  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
  res.json({ token });
};



// Create New User (Admin only)
exports.createUser = async (req, res) => {
  const { username, password, role} = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword, role});

  await user.save();
  res.status(201).json({ message: 'User created successfully' });
};


exports.getUser = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
  }
};
