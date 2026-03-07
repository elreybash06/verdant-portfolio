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
    const id = Number.parseInt(req.params.id, 10);
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ error: "Invalid project id" });
    }
    const project = await projectModel.getById(id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json(project);
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
    const id = Number.parseInt(req.params.id, 10);
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ error: "Invalid project id" });
    }
    const updated = await projectModel.update(id, req.body);
    if (!updated) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json(updated);
  } catch (e) {
    next(e);
  }
};

const deleteProject = async (req, res, next) => {
  try {
    const id = Number.parseInt(req.params.id, 10);
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ error: "Invalid project id" });
    }
    const deleted = await projectModel.delete(id);
    if (!deleted) {
      return res.status(404).json({ error: "Project not found" });
    }
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
