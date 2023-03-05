const express = require("express");
const router = express.Router();
const hotelController = require("../controllers/hotel.controller");
const authController = require("../controllers/auth.controller");
const { check, validationResult } = require("express-validator");

// public route to get all the hotel
router.get("/", hotelController.getHotels);

// public route to get an hotel by id
router.get("/:id", hotelController.getHotelById);

// admin route to create an hotel
router.post(
  "/",
  authController.protect,
  authController.restrictTo("admin"),
  hotelController.createHotel
);

// admin route to update hotel information
router.put(
  "/:id",
  authController.protect,
  authController.restrictTo("admin"),
  [
    check("name").notEmpty(),
    check("location").notEmpty(),
    check("description").notEmpty(),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  hotelController.updateHotel
);

// admin route to delete an hotel
router.delete("/:id", authController.protect, authController.restrictTo("admin"), hotelController.deleteHotel);

module.exports = router;
