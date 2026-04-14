const mongoose = require('mongoose');

const hostelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Hostel name is required'],
    trim: true,
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative'],
  },
  type: {
    type: String,
    enum: ['boys', 'girls', 'co-ed'],
    default: 'co-ed',
  },
  image:     { type: String, default: '' },
  images:    { type: [String], default: [] },
  mapLink:   { type: String, default: '' },
  amenities: { type: [String], default: [] },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
}, { timestamps: true });

module.exports = mongoose.model('Hostel', hostelSchema);