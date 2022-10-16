const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const topSectorsSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  Year: String,
  County: String,
  "Top Sectors": Array
});

// Define Model
const topSectorModel = mongoose.model("topsectors", topSectorsSchema);

module.exports = topSectorModel;