
const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: String,
  level: String,

});

const Skill = mongoose.model("Skill", projectSchema);

module.exports = Skill;