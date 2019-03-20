const express = require("express");
const mongoose = require("mongoose");
const Task = require("../models/task-model");
const Project = require("../models/project-model");

const router = express.Router();

router.post('/tasks', (req, res, next)=>{
  
  Task.create({
      title: req.body.title,
      description: req.body.description,  
      project: req.body.project
  })
    .then(response => {
        Project.findOneAndUpdate({"_id": req.body.project}, { $push:{ tasks: response._id } }, {new: true})
        .then(theResponse => {
            res.json(theResponse);
        })
        .catch(err => {
          res.json(err);
      })
    })
    .catch(err => {
      res.json(err);
    })
})

router.put('/tasks/:id', (req, res, next)=>{
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Task.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({ message: `Task with ${req.params.id} is updated successfully.` });
    })
    .catch(err => {
      res.json(err);
    })
})

// DELETE route => to delete a specific task
router.delete('/tasks/:id', (req, res, next)=>{

  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Task.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({ message: `Task with ${req.params.id} is removed successfully.` });
    })
    .catch(err => {
      res.json(err);
    })
})

module.exports = router;