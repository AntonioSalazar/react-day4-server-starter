const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Task = require("./task-model");

const ProjectSchema = new Schema({
  title: String,
  description: String,
  tasks: [{type: Schema.Types.ObjectId, ref: "Task"}],
  owner: {type: Schema.Types.ObjectId, ref: 'User'} 
});

const Project = mongoose.model("Project", ProjectSchema);

module.exports = Project;