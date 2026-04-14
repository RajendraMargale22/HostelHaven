const User    = require('../models/User');
const Hostel  = require('../models/Hostel');
const Booking = require('../models/Booking');
const Contact = require('../models/Contact');

// GET /api/admin/stats
const getStats = async (req, res, next) => {
  try {
    const [totalUsers, totalHostels, totalBookings, totalContacts, pendingBookings] = await Promise.all([
      User.countDocuments(),
      Hostel.countDocuments(),
      Booking.countDocuments(),
      Contact.countDocuments({ read: false }),
      Booking.countDocuments({ status: 'pending' }),
    ]);

    res.json({ totalUsers, totalHostels, totalBookings, totalContacts, pendingBookings });
  } catch (err) { next(err); }
};

// GET /api/admin/users
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (err) { next(err); }
};

// DELETE /api/admin/users/:id
const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted.' });
  } catch (err) { next(err); }
};

// GET /api/admin/bookings
const getAllBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find()
      .populate('hostel', 'name location price')
      .populate('user', 'username email')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) { next(err); }
};

// PATCH /api/admin/bookings/:id/status
const updateBookingStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const allowed = ['pending', 'confirmed', 'rejected', 'cancelled'];
    if (!allowed.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value.' });
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('hostel', 'name').populate('user', 'username email');

    if (!booking) return res.status(404).json({ message: 'Booking not found.' });
    res.json(booking);
  } catch (err) { next(err); }
};

// GET /api/admin/contacts
const getContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) { next(err); }
};

// PATCH /api/admin/contacts/:id/read
const markContactRead = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    if (!contact) return res.status(404).json({ message: 'Contact not found.' });
    res.json(contact);
  } catch (err) { next(err); }
};

// DELETE /api/admin/contacts/:id
const deleteContact = async (req, res, next) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: 'Contact deleted.' });
  } catch (err) { next(err); }
};

module.exports = {
  getStats,
  getUsers, deleteUser,
  getAllBookings, updateBookingStatus,
  getContacts, markContactRead, deleteContact,
};