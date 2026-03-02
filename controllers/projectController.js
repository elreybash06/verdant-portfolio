const projectModel = require("../models/projectModel");

const getAllProjects = async (req, res, next) => {
  try {
    res.json(await projectModel.getAll());
  } catch (e) {
    next(e);
  }
};

const getProjectById = async (req, res, next) => {
  try {
    res.json(await projectModel.getById(req.params.id));
  } catch (e) {
    next(e);
  }
};

const createProject = async (req, res, next) => {
  try {
    res.status(201).json(await projectModel.create(req.body));
  } catch (e) {
    next(e);
  }
};

const updateProject = async (req, res, next) => {
  try {
    res.json(await projectModel.update(req.params.id, req.body));
  } catch (e) {
    next(e);
  }
};

const deleteProject = async (req, res, next) => {
  try {
    await projectModel.delete(req.params.id);
    res.json({ message: "Project deleted successfully" });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
};