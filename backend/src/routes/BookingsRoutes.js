/**
 * Bookings Routes (Bookings.js)
 */

const express = require("express");
const router = express.Router();
const BookingsController = require("../controllers/BookingsController");
const authMiddleware = require("../middlewares/authMiddleware");

// ✅ Create Booking
router.post("/", authMiddleware, BookingsController.createBooking);

// ✅ Get All Bookings (Admin / User)
router.get("/", authMiddleware, BookingsController.getBookings);
router.get("/:id", authMiddleware, BookingsController.getBookingById);

module.exports = router;
