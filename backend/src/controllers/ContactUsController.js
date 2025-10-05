/**
 * ContactUs Controller (ContactUsController.js)
 */

const ContactUsService = require("../services/ContactUsService");
const MSG = require("../utils/MSG");
const getPaginationObject = require("../utils/paginationUtils");
const ResponseHelper = require("../utils/responseHelper");

// ✅ Create Contact Message (Public)
exports.createContactMessage = async (req, res) => {
  try {
    const contact = await ContactUsService.createContactMessage(req.body);
    return res
      .status(201)
      .send(ResponseHelper.success(200, MSG.CREATE_SUCCESS, contact));
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


// ✅ Get All Contact Messages (Admin)
exports.getAllContacts = async (req, res) => {
  try {
    const { search, pageNumber, pageSize, sortField, sortDirection } = req.query;

    const { contacts, totalCount } = await ContactUsService.getAllContacts({
      search,
      pageNumber,
      pageSize,
      sortField,
      sortDirection,
    });

    const paginationObject = await getPaginationObject(
      contacts,
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
          contacts,
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

// ✅ Get Single Contact Message by ID (Admin)
exports.getContactById = async (req, res) => {
  try {
    const contact = await ContactUsService.getById(req.params.id);

    if (!contact) {
      return res
        .status(404)
        .json(ResponseHelper.error(404, MSG.NOT_FOUND, req));
    }

    return res
      .status(200)
      .send(ResponseHelper.success(200, MSG.FOUND_SUCCESS, contact));
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
