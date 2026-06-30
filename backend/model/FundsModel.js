const mongoose = require("mongoose");

const FundsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  availableMargin: { type: Number, default: 0 },
  usedMargin: { type: Number, default: 0 },
});

const FundsModel = mongoose.model("Funds", FundsSchema);
module.exports = { FundsModel };