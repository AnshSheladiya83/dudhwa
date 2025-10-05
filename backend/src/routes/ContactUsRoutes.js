
/**
 * ContactUs Routes (ContactUs.js)
 */

const express = require("express");
const router = express.Router();
const ContactUsController = require("../controllers/ContactUsController");
const authMiddleware = require("../middlewares/authMiddleware");

// ✅ Create Contact Message (Public, no auth required)
router.post("/", ContactUsController.createContactMessage);

// ✅ Get All Contact Messages (Admin only)
router.get("/", authMiddleware, ContactUsController.getAllContacts);

// ✅ Get Single Contact Message by ID (Admin only)
router.get("/:id", authMiddleware, ContactUsController.getContactById);

module.exports = router;
