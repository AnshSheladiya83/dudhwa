/**
 * ContactUs Model (ContactUs.js)
 */

const mongoose = require('mongoose');
const { MODELS } = require('../config/constants');

const ContactUsSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  contactNo: { type: String, required: true },
  dateOfArrival: { type: Date },
  country: { type: String },
  durationOfStay: { type: String },
  numberOfPersons: { type: Number },
  tourDescription: { type: String },
  verificationCode: { type: String }, // e.g., captcha verification

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
}, { versionKey: false });

module.exports = mongoose.model(MODELS.CONTACT_US, ContactUsSchema);
