const express  = require('express');
const router   = express.Router();
const { body, validationResult } = require('express-validator');
const { sendMessage } = require('../controllers/contactController');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ message: errors.array()[0].msg });
  next();
};

router.post('/', [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('message').trim().notEmpty().withMessage('Message is required'),
], validate, sendMessage);

module.exports = router;