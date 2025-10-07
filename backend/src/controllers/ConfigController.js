const ConfigService = require("../services/ConfigService.js");
const ResponseHelper = require("../utils/responseHelper");
const MSG = require("../utils/MSG");

// ✅ Add new off date(s)
exports.addOffDates = async (req, res) => {
  try {
    const { dates } = req.body; // expecting array of dates

    if (!dates || !Array.isArray(dates) || dates.length === 0) {
      return res.status(400).send(ResponseHelper.error(400, "Please provide an array of dates"));
    }

    const config = await ConfigService.addOffDates(dates, req.user._id);

    return res
      .status(200)
      .send(ResponseHelper.success(200, MSG.CREATE_SUCCESS, config));
  } catch (error) {
    return res
      .status(500)
      .send(ResponseHelper.error(500, error?.message || MSG.INTERNAL_SERVER_ERROR, req));
  }
};

// ✅ Get all configs
exports.getAllConfigs = async (req, res) => {
  try {
    const configs = await ConfigService.getAllConfigs();
    return res
      .status(200)
      .send(ResponseHelper.success(200, MSG.FOUND_SUCCESS, configs));
  } catch (error) {
    return res
      .status(500)
      .send(ResponseHelper.error(500, error?.message || MSG.INTERNAL_SERVER_ERROR, req));
  }
};

// ✅ Get all off dates
exports.getAllOffDates = async (req, res) => {
  try {
    const offDates = await ConfigService.getAllOffDates();
    return res
      .status(200)
      .send(ResponseHelper.success(200, MSG.FOUND_SUCCESS, offDates));
  } catch (error) {
    return res
      .status(500)
      .send(ResponseHelper.error(500, error?.message || MSG.INTERNAL_SERVER_ERROR, req));
  }
};
