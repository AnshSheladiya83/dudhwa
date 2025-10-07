const express = require("express");
const router = express.Router();
const ConfigController = require("../controllers/ConfigController.js");
const authMiddleware = require("../middlewares/authMiddleware");

// ✅ Add new off date(s)
router.post("/off-dates", authMiddleware, ConfigController.addOffDates);

// ✅ Get all configs
router.get("/", authMiddleware, ConfigController.getAllConfigs);

// ✅ Get all off dates
router.get("/off-dates", ConfigController.getAllOffDates);

module.exports = router;
