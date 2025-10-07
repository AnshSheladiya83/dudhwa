/**
 * Config Model (Config.js)
 */

const mongoose = require('mongoose');
const { MODELS } = require('../config/constants');

const ConfigSchema = new mongoose.Schema({
  off_dates: [{ type: Date }], // Array of off dates

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

module.exports = mongoose.model(MODELS.CONFIG, ConfigSchema);
