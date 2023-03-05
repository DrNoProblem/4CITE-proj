const Hotel = require("../models/hotel.model");
const { body, validationResult } = require('express-validator');

// Get all hotels
exports.getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get hotel by id
exports.getHotelById = async (req, res) => {
  const { id } = req.params;

  try {
    const hotel = await Hotel.findById(id);
    res.status(200).json(hotel);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Create new hotel

exports.createHotel = [
  body('name')
    .notEmpty().withMessage('Name is required.')
    .isString().withMessage('Name should be a string.'),
  body('location')
    .notEmpty().withMessage('Location is required.')
    .isString().withMessage('Location should be a string.'),
  body('description')
    .notEmpty().withMessage('Description is required.')
    .isString().withMessage('Description should be a string.'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, location, description } = req.body;

    try {
      const existingHotel = await Hotel.findOne({ name });
      if (existingHotel) {
        return res.status(400).json({ message: 'Hotel with this name already exists.' });
      }

      const hotel = await Hotel.create({
        name,
        location,
        description,
      });
      res.status(201).json(hotel);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
];


// Update hotel by id
exports.updateHotel = async (req, res) => {
  const { id } = req.params;
  const { name, location, description } = req.body;

  try {
    const hotel = await Hotel.findByIdAndUpdate(
      id,
      {
        name,
        location,
        description,
      },
      { new: true }
    );
    res.status(200).json(hotel);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete hotel by id
exports.deleteHotel = async (req, res) => {
  const { id } = req.params;

  try {
    await Hotel.findByIdAndDelete(id);
    res.json({ message: "Hotel deleted successfully" });
  } catch (err) {
    next(err);
  }
};