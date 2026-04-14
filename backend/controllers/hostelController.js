const Hostel = require('../models/Hostel');

// GET /api/hostels
const getHostels = async (req, res, next) => {
  try {
    const { location, type, minPrice, maxPrice } = req.query;
    const filter = {};

    if (location) filter.location = { $regex: location, $options: 'i' };
    if (type)     filter.type = type;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const hostels = await Hostel.find(filter)
      .populate('addedBy', 'username email')
      .sort({ createdAt: -1 });

    res.json(hostels);
  } catch (err) { next(err); }
};

// GET /api/hostels/:id
const getHostelById = async (req, res, next) => {
  try {
    const hostel = await Hostel.findById(req.params.id).populate('addedBy', 'username email');
    if (!hostel) return res.status(404).json({ message: 'Hostel not found.' });
    res.json(hostel);
  } catch (err) { next(err); }
};

// POST /api/hostels
const createHostel = async (req, res, next) => {
  try {
    const { name, location, price, type, image, images, mapLink, amenities } = req.body;

    if (!name || !location || !price) {
      return res.status(400).json({ message: 'Name, location and price are required.' });
    }

    const hostel = await Hostel.create({
      name, location, price, type, image, images, mapLink, amenities,
      addedBy: req.user.id,
    });

    await hostel.populate('addedBy', 'username email');
    res.status(201).json(hostel);
  } catch (err) { next(err); }
};

// PUT /api/hostels/:id
const updateHostel = async (req, res, next) => {
  try {
    const hostel = await Hostel.findById(req.params.id);
    if (!hostel) return res.status(404).json({ message: 'Hostel not found.' });

    const isOwner = hostel.addedBy?.toString() === req.user.id;
    const isAdmin = req.user.role === 'admin';

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: 'Not authorized to edit this hostel.' });
    }

    const updated = await Hostel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    ).populate('addedBy', 'username email');

    res.json(updated);
  } catch (err) { next(err); }
};

// DELETE /api/hostels/:id
const deleteHostel = async (req, res, next) => {
  try {
    const hostel = await Hostel.findById(req.params.id);
    if (!hostel) return res.status(404).json({ message: 'Hostel not found.' });

    const isOwner = hostel.addedBy?.toString() === req.user.id;
    const isAdmin = req.user.role === 'admin';

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: 'Not authorized to delete this hostel.' });
    }

    await Hostel.findByIdAndDelete(req.params.id);
    res.json({ message: 'Hostel deleted successfully.' });
  } catch (err) { next(err); }
};

module.exports = { getHostels, getHostelById, createHostel, updateHostel, deleteHostel };