const express  = require('express');
const router   = express.Router();
const { protect, adminOnly } = require('../middleware/authMiddleware');
const {
  getStats,
  getUsers, deleteUser,
  getAllBookings, updateBookingStatus,
  getContacts, markContactRead, deleteContact,
} = require('../controllers/adminController');

// All admin routes require auth + admin role
router.use(protect, adminOnly);

router.get('/stats',                       getStats);
router.get('/users',                       getUsers);
router.delete('/users/:id',                deleteUser);
router.get('/bookings',                    getAllBookings);
router.patch('/bookings/:id/status',       updateBookingStatus);
router.get('/contacts',                    getContacts);
router.patch('/contacts/:id/read',         markContactRead);
router.delete('/contacts/:id',             deleteContact);

module.exports = router;