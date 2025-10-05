/**
 * Bookings Controller (BookingsController.js)
 */

const BookingsService = require("../services/BookingsService");
const MSG = require("../utils/MSG");
const getPaginationObject = require("../utils/paginationUtils");
const ResponseHelper = require("../utils/responseHelper");

// ✅ Create Booking
exports.createBooking = async (req, res) => {
  try {
    const booking = await BookingsService.createBooking(req.body, req.user._id);
    return res
      .status(201)
      .send(ResponseHelper.success(200, MSG.CREATE_SUCCESS, booking));
  } catch (error) {
    return res
      .status(500)
      .send(
        ResponseHelper.error(
          500,
          error?.message || MSG.INTERNAL_SERVER_ERROR,
          req
        )
      );
  }
};

// ✅ Get Bookings (Paginated)
exports.getBookings = async (req, res) => {
  try {
    const { search, pageNumber, pageSize, sortField, sortDirection } = req.query;
    const { bookings, totalCount } = await BookingsService.getBookings({
      search,
      pageNumber,
      pageSize,
      sortField,
      sortDirection,
      userId: req.user._id,
      isAdmin: req.user.isAdmin,
    });

    const paginationObject = await getPaginationObject(
      bookings,
      pageNumber,
      pageSize,
      totalCount
    );

    return res
      .status(200)
      .send(
        ResponseHelper.success(
          200,
          MSG.FOUND_SUCCESS,
          bookings,
          paginationObject
        )
      );
  } catch (error) {
    return res
      .status(500)
      .send(
        ResponseHelper.error(
          500,
          error?.message || MSG.INTERNAL_SERVER_ERROR,
          req
        )
      );
  }
};
exports.getBookingById = async (req, res) => {
  try {
    const booking = await BookingsService.getById(req.params.id);

    if (!booking) {
      return res
        .status(404)
        .json(ResponseHelper.error(404, MSG.NOT_FOUND, req));
    }

    return res
      .status(200)
      .send(ResponseHelper.success(200, MSG.FOUND_SUCCESS, booking));
  } catch (error) {
    return res
      .status(500)
      .send(
        ResponseHelper.error(
          500,
          error?.message || MSG.INTERNAL_SERVER_ERROR,
          req
        )
      );
  }
};