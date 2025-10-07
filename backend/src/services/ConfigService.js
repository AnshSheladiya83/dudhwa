const Config = require("../models/Configs");

class ConfigService {
  // ✅ Add off dates
  async addOffDates(dates, userId) {
    let config = await Config.findOne(); // assuming only one config doc
    if (!config) {
      config = new Config({
        off_dates: dates,
        created_by: userId
      });
    } else {
      // merge new dates (avoid duplicates)
      const currentDates = config.off_dates.map(d => d.toISOString());
      const newDates = dates.filter(d => !currentDates.includes(new Date(d).toISOString()));
      config.off_dates.push(...newDates.map(d => new Date(d)));
      config.updated_at = new Date();
      config.updated_by = userId;
    }

    return await config.save();
  }

  // ✅ Get all configs
  async getAllConfigs() {
    return await Config.find({ is_deleted: false });
  }

  // ✅ Get all off dates
  async getAllOffDates() {
    const config = await Config.findOne({ is_deleted: false });
    return config?.off_dates || [];
  }
}

module.exports = new ConfigService();
