/**
 * File Name: responseHelper.js
 */
const ErrorLog = require("../models/ErrorLog");

class ResponseHelper {
  static success(statusCode = 200, message = "", data, meta) {
    return {
      statusCode,
      message,
      success: true,
      data,
      meta,
    };
  }

  static error( statusCode = 500, message = "An error occurred", req) {
  if (![401, 404].includes(statusCode)) {
      (async () => {
        try {
          await ErrorLog.create({
            statusCode,
            message,
            request: {
              body: req?.body,
              query: req?.query,
              params: req?.params,
            },
            path: req?.originalUrl,
            method: req?.method,
          });
        } catch (logErr) {
          console.error("Failed to log error:", logErr.message);
        }
      })();
    }

    return {
      statusCode,
      message,
      success: false,
    };
  }
}

module.exports = ResponseHelper;
