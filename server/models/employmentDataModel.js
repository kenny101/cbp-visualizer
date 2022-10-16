const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const employmentDataSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  Year: String,
  Sector: String,
  Quantiles: Array,
  Employment: Array
});

// Define Model
const employmentDataModel = mongoose.model("basictests", employmentDataSchema);

module.exports = employmentDataModel;
