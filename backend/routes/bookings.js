const express  = require('express');
const router   = express.Router();
const { protect, adminOnly } = require('../middleware/authMiddleware');
const {
  createBooking, getMyBookings, cancelBooking, deleteBooking,
} = require('../controllers/bookingController');

router.post('/',               protect, createBooking);
router.get('/my',              protect, getMyBookings);
router.patch('/:id/cancel',    protect, cancelBooking);
router.delete('/:id',          protect, adminOnly, deleteBooking);

module.exports = router;