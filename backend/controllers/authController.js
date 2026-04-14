const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');
const User   = require('../models/User');

const generateToken = (user) => jwt.sign(
  { id: user._id, role: user.role, username: user.username },
  process.env.JWT_SECRET,
  { expiresIn: '7d' }
);

// POST /api/auth/register
const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email is already registered.' });

    const hashed = await bcrypt.hash(password, 12);
    const user   = await User.create({ username, email, password: hashed });

    res.status(201).json({
      message: 'Account created successfully',
      token: generateToken(user),
      user: { id: user._id, username: user.username, role: user.role },
    });
  } catch (err) { next(err); }
};

// POST /api/auth/login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password.' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid email or password.' });

    res.json({
      message: 'Login successful',
      token: generateToken(user),
      user: { id: user._id, username: user.username, role: user.role },
    });
  } catch (err) { next(err); }
};

module.exports = { register, login };