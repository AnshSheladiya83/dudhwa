/**
 * Bookings Service (BookingsService.js)
 */

const Bookings = require("../models/Bookings");
const { aggregate } = require("../utils/aggregateHelpers/aggregationHelper");
const { createPaginationStages } = require("../utils/aggregateHelpers/limitStageHelper");
const { createMatchRegexStage, createMatchStage } = require("../utils/aggregateHelpers/matchStageHelper");
const { createSortStage } = require("../utils/aggregateHelpers/sortStageHelper");
const { default: mongoose } = require("mongoose");
const MSG = require("../utils/MSG");

class BookingsService {
  // ✅ Create Booking
  async createBooking(data, userId) {
    const booking = new Bookings({
      ...data,
      user_id: userId,
      created_at: new Date(),
      created_by: userId,
      updated_at: null,
      updated_by: null,
      is_deleted: false,
      deleted_at: null,
      deleted_by: null,
    });
    return await booking.save();
  }

  // ✅ Get All Bookings (Admin/User)
  async getBookings({ search, pageNumber=1, pageSize=1000, sortField, sortDirection, userId, isAdmin }) {
    let pipeline = [];

    // If not admin → show only user's bookings
    if (!isAdmin) {
      pipeline.push(createMatchStage("created_by", new mongoose.Types.ObjectId(userId)));
    }

    // Search filter
    if (search) {
      pipeline.push(
        createMatchRegexStage("zone", search),
        createMatchRegexStage("timeSlot", search)
      );
    }

    // Only non-deleted bookings
    pipeline.push(createMatchStage("is_deleted", false));

    const totalCount = (await aggregate("bookings", pipeline)).length;

    // Sorting
    if (sortField) {
      sortDirection = sortDirection?.toLowerCase() === "asc" ? 1 : -1;
      pipeline.push(createSortStage(sortField, sortDirection));
    } else {
      pipeline.push(createSortStage("created_at", -1));
    }

    // Pagination
    pageNumber = Number(pageNumber) || 1;
    pageSize = Number(pageSize) || 8;
    pipeline.push(...createPaginationStages(pageNumber, pageSize));

    const bookings = await aggregate("bookings", pipeline);

    return { bookings, totalCount };
  }

  async getById(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error(MSG.INVALID_OBJECTID);
  }

  const objectId = new mongoose.Types.ObjectId(id);

  const pipeline = [
    createMatchStage("_id", objectId),
    createMatchStage("is_deleted", false)
  ];

  const bookings = await aggregate("bookings", pipeline);
  return bookings[0] || null;
}
}

module.exports = new BookingsService();
