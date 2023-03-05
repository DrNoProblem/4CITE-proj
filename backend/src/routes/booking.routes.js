const express = require('express');
const router = express.Router();
const { createBooking, getBookingById, updateBookingById, deleteBookingById, getAllBookings, getBookingsByUser, getBookingsByHotel } = require('../controllers/booking.controller');
const { protect } = require('../controllers/auth.controller');

// Create a new booking
router.post('/', protect, createBooking);

// Get a specific booking by ID
router.get('/:id', protect, getBookingById);

// Update a specific booking by ID
router.patch('/:id', protect, updateBookingById);

// Delete a specific booking by ID
router.delete('/:id', protect, deleteBookingById);

// Get all bookings
router.get('/', protect, getAllBookings);

// Get all bookings for a specific user
router.get('/user/:userId', protect, getBookingsByUser);

// Get all bookings for a specific hotel
router.get('/hotel/:hotelId', protect, getBookingsByHotel);

module.exports = router;
