/**
 * Booking Model (Bookings.js)
 */

const mongoose = require("mongoose");
const { MODELS } = require("../config/constants");

const PassengerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    nationality: { type: String, enum: ["Indian", "Foreigner"], required: true },
    age: { type: Number, required: true },
    type: { type: String, enum: ["Booker", "Adult", "Children"], required: true },
  },
  { _id: false }
);

const BookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: MODELS.USERS,
      required: false, // Guest bookings also allowed
    },
    safari_zone: {
      type: String,
      enum: ["Zone A", "Zone B", "Zone C"],
      required: true,
    },
    bookedCar: { type: String },
    safari_date: { type: Date, required: true },
    time_slot: { type: String, enum: ["morning", "evening"], required: true },

    adults: { type: Number, default: 0 },
    children: { type: Number, default: 0 },

    passengers: [PassengerSchema],

    // Payment info
    amount: { type: Number},
    tax: { type: Number },
    totalPayable: { type: Number },
    razorpay_payment_id: { type: String },
    razorpay_order_id: { type: String },
    payment_status: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },

    // Audit info
    created_at: { type: Date, default: Date.now },
    updated_at: Date,
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: MODELS.USERS,
    },
    updated_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: MODELS.USERS,
    },
    is_deleted: { type: Boolean, default: false },
    deleted_at: Date,
    deleted_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: MODELS.USERS,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model(MODELS.BOOKINGS, BookingSchema);
