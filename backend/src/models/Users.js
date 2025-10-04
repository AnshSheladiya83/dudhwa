/**
 * Users Model ( Users.js )
 */

const mongoose = require('mongoose');
const { MODELS } = require('../config/constants');

const UsersSchema = new mongoose.Schema({
    email: { type: String }, 
    password: { type: String }, 
    firstName: { type: String }, 
    lastName: { type: String }, 
    isActive: { type: Boolean }, 
    isAdmin: { type: Boolean }, 
    role: { type: String }, 
    phone: { type: String }, 
    profile_image_url: { type: String }, 

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

module.exports = mongoose.model(MODELS.USERS, UsersSchema);