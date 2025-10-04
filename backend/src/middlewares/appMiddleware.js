const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const path = require("path");
const requestLogger = require("./requestLogger");

function registerAppMiddleware(app) {
  // Static files
  app.use("/uploads", express.static(path.join(__dirname, "../../uploads")));

  // Request parsers
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(requestLogger);

  // CORS
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

  // app.use(sanitizeReqBody);
}

module.exports = registerAppMiddleware;
