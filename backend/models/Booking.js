const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  hostel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hostel',
    required: [true, 'Hostel reference is required'],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User reference is required'],
  },
  name:     { type: String, required: [true, 'Guest name is required'], trim: true },
  email:    { type: String, required: [true, 'Email is required'], trim: true },
  phone:    { type: String, required: [true, 'Phone number is required'], trim: true },
  checkIn:  { type: Date,   required: [true, 'Check-in date is required'] },
  duration: { type: Number, required: [true, 'Duration is required'], min: [1, 'Minimum 1 month'] },
  message:  { type: String, default: '' },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'rejected', 'cancelled'],
    default: 'pending',
  },
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);