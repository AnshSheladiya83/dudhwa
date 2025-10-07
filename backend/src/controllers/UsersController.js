/**
 * Users Controller ( UsersController.js )
 */

const UsersService = require("../services/UsersService");
const MSG = require("../utils/MSG");
const getPaginationObject = require("../utils/paginationUtils");
const ResponseHelper = require("../utils/responseHelper");

exports.create = async (req, res) => {
  try {
    const users = await UsersService.create(req.body, req.user._id);
    return res
      .status(201)
      .send(ResponseHelper.success(200, MSG.CREATE_SUCCESS, users));
  } catch (error) {
   return res
      .status(500)
      .send(
        ResponseHelper.error(500, error?.message || MSG.INTERNAL_SERVER_ERROR,req)
      );
  }
};

exports.getAll = async (req, res) => {
  try {
    const { search, pageNumber, pageSize, sortField, sortDirection } = req.query;

    const { users, usersCounts } = await UsersService.getAll({
      search,
      pageNumber,
      pageSize,
      sortField,
      sortDirection,
    });

    // Add user_type based on isAdmin / isHotel
    const usersWithType = users.map(user => {
      let user_type = "User"; // default
      if (user.isAdmin) user_type = "Admin";
      else if (user.isHotel) user_type = "Hotel";

      return {
        ...user.toObject ? user.toObject() : user, // in case it's a Mongoose doc
        user_type,
      };
    });

    const paginationObject = await getPaginationObject(
      usersWithType,
      pageNumber,
      pageSize,
      usersCounts
    );

    return res
      .status(200)
      .send(
        ResponseHelper.success(
          200,
          MSG.FOUND_SUCCESS,
          usersWithType,
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


exports.getById = async (req, res) => {
  try {
    const users = await UsersService.getById(req.params.id);

    if (!users) {
      return res.status(404).json(ResponseHelper.error(404, MSG.NOT_FOUND,req));
    }
    return res
      .status(200)
      .send(ResponseHelper.success(200, MSG.FOUND_SUCCESS, users));
  } catch (error) {
     return res
      .status(500)
      .send(
        ResponseHelper.error(500, error?.message || MSG.INTERNAL_SERVER_ERROR,req)
      );
  }
};

exports.updateById = async (req, res) => {
  try {
    const users = await UsersService.updateById(
      req.params.id,
      req.body,
      req.user._id
    );

    if (!users) {
      return res.status(404).send();
    }
    return res
      .status(200)
      .send(ResponseHelper.success(200, MSG.UPDATE_SUCCESS, users));
  } catch (error) {
    return res
      .status(500)
      .send(
        ResponseHelper.error(500, error?.message || MSG.INTERNAL_SERVER_ERROR,req)
      );
  }
};

exports.deleteById = async (req, res) => {
  try {
    const users = await UsersService.deleteById(
      req.params.id,
      req.user._id
    );
    if (!users) {
      return res.status(404).json(ResponseHelper.error(404, MSG.NOT_FOUND,req));
    }
    return res
      .status(200)
      .send(ResponseHelper.success(200, MSG.DELETE_SUCCESS, users));
  } catch (error) {
    return res
      .status(500)
      .send(
        ResponseHelper.error(500, error?.message || MSG.INTERNAL_SERVER_ERROR,req)
      );
  }
};

exports.getSuggestions = async (req, res) => {
  try {
    let { search } = req.query;

    if (!search || search.trim() === "") {
      return res
        .status(400)
        .send(ResponseHelper.error(400, "Search query is required.",req));
    }

    const suggestions = await UsersService.getSuggestions(search);

    return res
      .status(200)
      .send(
        ResponseHelper.success(
          200,
          "Suggestions found successfully",
          suggestions
        )
      );
  } catch (error) {
    return res
      .status(500)
      .send(
        ResponseHelper.error(500, error?.message || MSG.INTERNAL_SERVER_ERROR,req)
      );
  }
};
