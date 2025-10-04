const MSG = require("../utils/MSG");
const ResponseHelper = require("../utils/responseHelper");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

const publicAuthMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next();
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, config.jwtSecret, async (err, decoded) => {
      if (err) {
        console.warn(
          "JWT invalid or expired in publicAuthMiddleware:",
          err.message
        );
        return next();
      }

      const address = decoded.address;
      if (!address) {
        return next();
      }

      const queryText = "SELECT * FROM investors WHERE evm_address = $1";
      const investor = await req.db.query(queryText, [address]);

      if (investor.rows.length > 0) {
        req.user = investor.rows[0];
      }
      return next();
    });
  } catch (error) {
    console.error("publicAuthMiddleware error:", error);
    return next();
  }
};

module.exports = publicAuthMiddleware;
