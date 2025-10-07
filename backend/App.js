
const express = require("express");
const app = express();

// Connect Database
require("./src/db/mongoose-connection.js");

// Middlewares
const registerAppMiddleware = require("./src/middlewares/appMiddleware.js");
registerAppMiddleware(app);

// Routes
const UsersRoutes = require("./src/routes/UsersRoutes");
const BookingsRoutes = require("./src/routes/BookingsRoutes.js");
const ContactUsRoutes = require("./src/routes/ContactUsRoutes.js");
const ConfigRoutes = require("./src/routes/ConfigRoutes.js");
const AuthRoutes = require("./src/routes/AuthRoutes");

app.use("/api/users", UsersRoutes);
app.use("/api/bookings", BookingsRoutes);
app.use("/api/contactus", ContactUsRoutes);
app.use("/api/config", ConfigRoutes);
app.use("/api/auth", AuthRoutes);

// Error & Promise Handlers
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});
process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Promise Rejection:", reason);
  process.exit(1);
});

// Root route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start server
const port = 8382;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
