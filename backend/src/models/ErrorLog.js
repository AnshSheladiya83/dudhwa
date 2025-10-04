const mongoose = require("mongoose");

const ErrorLogSchema = new mongoose.Schema(
  {
    statusCode: { type: Number, default: 500 },
    message: { type: String },
    errors: { type: mongoose.Schema.Types.Mixed },
    request: {
      body: { type: mongoose.Schema.Types.Mixed },
      query: { type: mongoose.Schema.Types.Mixed },
      params: { type: mongoose.Schema.Types.Mixed },
    },
    path: { type: String },
    method: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ErrorLog", ErrorLogSchema);
