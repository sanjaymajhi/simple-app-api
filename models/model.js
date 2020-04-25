const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Startup = new Schema({
  id: {},
  name: { type: String, required: true },
  country: { type: String, required: true },
});

module.exports = mongoose.model("Startup", Startup);
