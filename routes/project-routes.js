const express = require("express");
const mongoose = require("mongoose");
const Project = require("../models/project-model");
const router = express.Router();

router.get("/projects", (req, res, next) => {
  Project.find().populate("tasks")
  .then(allTheProjects => {
    res.json(allTheProjects)
  })
  .catch(err => next(res.json(err)))
})

router.post("/projects", (req, res, next) => {
  Project.create({
    title : req.body.title,
    description : req.body.description,
    tasks : [],
    owner: req.user._id
  })
  .then(newProject => {
    res.json(newProject)
  })
  .catch(err => next(res.json(err)))
})

router.get("/projects/:id", (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({message: "Specified id is not valid"})
    return;
  }
  Project.findById(req.params.id).populate("tasks")
  .then(ProjectById => {
    res.json(ProjectById)
  })
  .catch(err => next(res.json(err)))
})

router.put("/projects/:id", (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({message: "Specified id is not valid"})
    return;
  }
  Project.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then(updatedProject => {
    res.json( {
      message: `Project with id ${req.params.id} has been updated`
    })
  })
  .catch(err => next(res.json(err)))
})


router.delete("/projects/:id", (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({message: "Specified id is not valid"})
    return
  }

  Project.findByIdAndDelete(req.params.id)
  .then(()=>{
    res.json({message: `Project with id ${req.params.id} has been deleted`})
  })
  .catch(err => next(res.json(err)))
})

module.exports = router;