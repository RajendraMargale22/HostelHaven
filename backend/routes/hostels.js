const express  = require('express');
const router   = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getHostels, getHostelById,
  createHostel, updateHostel, deleteHostel,
} = require('../controllers/hostelController');

router.get('/',     getHostels);
router.get('/:id',  getHostelById);
router.post('/',    protect, createHostel);
router.put('/:id',  protect, updateHostel);
router.delete('/:id', protect, deleteHostel);

module.exports = router;