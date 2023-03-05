const { body, validationResult } = require('express-validator');
const Booking = require('../models/booking.model');

exports.createBooking = [
  body('user')
    .notEmpty().withMessage('User is required.')
    .isMongoId().withMessage('User must be a valid MongoDB ObjectId.'),
  body('hotel')
    .notEmpty().withMessage('Hotel is required.')
    .isMongoId().withMessage('Hotel must be a valid MongoDB ObjectId.'),
  body('checkInDate')
    .notEmpty().withMessage('Check-in date is required.'),
  body('checkOutDate')
    .notEmpty().withMessage('Check-out date is required.'),
  body('roomType')
    .notEmpty().withMessage('Room type is required.')
    .isString().withMessage('Room type should be a string.'),
  body('numberOfRooms')
    .notEmpty().withMessage('Number of rooms is required.')
    .isInt().withMessage('Number of rooms should be an integer.'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { user, hotel, checkInDate, checkOutDate, roomType, numberOfRooms } = req.body;

    try {
      const booking = await Booking.create({
        user,
        hotel,
        checkInDate: new Date(checkInDate),
        checkOutDate: new Date(checkOutDate),
        roomType,
        numberOfRooms,
      });
      res.status(201).json(booking);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
];

exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('user hotel');
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found.' });
    }
    if (req.user.role !== 'admin' && req.user._id.toString() !== booking.user._id.toString()) {
      return res.status(403).json({ message: 'You are not authorized to access this booking.' });
    }
    res.json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateBookingById = [
  body('user')
    .optional()
    .isMongoId().withMessage('User must be a valid MongoDB ObjectId.'),
  body('hotel')
    .optional()
    .isMongoId().withMessage('Hotel must be a valid MongoDB ObjectId.'),
  body('checkInDate')
    .optional(),
  body('checkOutDate')
    .optional(),
  body('roomType')
    .optional()
    .isString().withMessage('Room type should be a string.'),
  body('numberOfRooms')
    .optional()
    .isInt().withMessage('Number of rooms should be an integer.'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const booking = await Booking.findById(req.params.id);
      if (!booking) {
        return res.status(404).json({ message: 'Booking not found.' });
      }

      if (req.body.checkInDate) {
        booking.checkInDate = new Date(req.body.checkInDate);
      }
      if (req.body.checkOutDate) {
        booking.checkOutDate = new Date(req.body.checkOutDate);
      }
      if (req.body.user) {
        booking.user = req.body.user;
      }
      if (req.body.hotel) {
        booking.hotel = req.body.hotel;
      }
      if (req.body.roomType) {
        booking.roomType = req.body.roomType;
      }
      if (req.body.numberOfRooms) {
        booking.numberOfRooms = req.body.numberOfRooms;
      }
    
      await booking.save();
    
      res.json(booking);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
    },
    ];
    
    exports.deleteBookingById = async (req, res) => {
    try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
    return res.status(404).json({ message: 'Booking not found.' });
    }
    
    if (req.user.role !== 'admin' && req.user._id.toString() !== booking.user._id.toString()) {
      return res.status(403).json({ message: 'You are not authorized to delete this booking.' });
    }
    
    await booking.remove();
    res.json({ message: 'Booking deleted successfully.' });
    } catch (error) {
    res.status(400).json({ message: error.message });
    }
    };
    
    exports.getAllBookings = async (req, res) => {
    try {
    const bookings = await Booking.find().populate('user hotel');
    res.json(bookings);
    } catch (error) {
    res.status(400).json({ message: error.message });
    }
    };
    
    exports.getBookingsByUser = async (req, res) => {
    try {
    const bookings = await Booking.find({ user: req.params.userId }).populate('user hotel');
    res.json(bookings);
    } catch (error) {
    res.status(400).json({ message: error.message });
    }
    };
    
    exports.getBookingsByHotel = async (req, res) => {
    try {
    const bookings = await Booking.find({ hotel: req.params.hotelId }).populate('user hotel');
    res.json(bookings);
    } catch (error) {
    res.status(400).json({ message: error.message });
    }
    };