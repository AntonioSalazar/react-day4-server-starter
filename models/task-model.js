const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Project = require("./project-model");

const TaskSchema = new Schema({
  title: String,
  description: String,
  project: [{type: Schema.Types.ObjectId, ref: "Project"}]
})

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;