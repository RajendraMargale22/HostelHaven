const Booking = require('../models/Booking');

// POST /api/bookings
const createBooking = async (req, res, next) => {
  try {
    const { hostel, name, email, phone, checkIn, duration, message } = req.body;

    if (!hostel || !name || !email || !phone || !checkIn || !duration) {
      return res.status(400).json({ message: 'All booking fields are required.' });
    }

    const booking = await Booking.create({
      hostel, name, email, phone, checkIn, duration, message,
      user: req.user.id,
      status: 'pending',
    });

    await booking.populate('hostel', 'name location price');
    await booking.populate('user', 'username email');

    res.status(201).json(booking);
  } catch (err) { next(err); }
};

// GET /api/bookings/my
const getMyBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate('hostel', 'name location price image type')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) { next(err); }
};

// PATCH /api/bookings/:id/cancel
const cancelBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found.' });

    if (booking.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You can only cancel your own bookings.' });
    }
    if (booking.status === 'cancelled') {
      return res.status(400).json({ message: 'Booking is already cancelled.' });
    }

    booking.status = 'cancelled';
    await booking.save();
    res.json({ message: 'Booking cancelled successfully.', booking });
  } catch (err) { next(err); }
};

// DELETE /api/bookings/:id  (admin only)
const deleteBooking = async (req, res, next) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: 'Booking deleted.' });
  } catch (err) { next(err); }
};

module.exports = { createBooking, getMyBookings, cancelBooking, deleteBooking };