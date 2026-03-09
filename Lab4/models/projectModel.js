const mongoose = require("mongoose");
const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
});

module.exports = mongoose.model("Project", projectSchema);
