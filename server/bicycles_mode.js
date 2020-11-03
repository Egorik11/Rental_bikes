const mongoose = require("mongoose");
const bicyclesSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  price: { type: Number },
  type: { type: String },
  available: { type: Boolean },
});
module.exports = mongoose.model("Bike_rental", bicyclesSchema);
