const projectModel = require("../models/projectModel");
const clean = (v) => (typeof v === "string" ? v.trim() : "");

const getProjects = async (req, res, next) => {
  try { res.json(await projectModel.getAll()); } catch (e) { next(e); }
};

const getProjectById = async (req, res, next) => {
  try {
    const id = Number.parseInt(req.params.id, 10);
    if (!Number.isInteger(id) || id <= 0) return res.status(400).json({ error: "invalid project id" });
    const project = await projectModel.getById(id);
    if (!project) return res.status(404).json({ error: "project not found" });
    res.json(project);
  } catch (e) { next(e); }
};

const createProject = async (req, res, next) => {
  try {
    const title = clean(req.body.title);
    const description = clean(req.body.description);
    const techStack = clean(req.body.techStack || req.body.tech_stack);
    const image = clean(req.body.image);
    const demoLink = clean(req.body.demoLink || req.body.demo_link);
    if (!title || !description || !techStack) return res.status(400).json({ error: "title, description and techStack are required" });
    res.status(201).json(await projectModel.create({ title, description, techStack, image, demoLink }));
  } catch (e) { next(e); }
};

const deleteProject = async (req, res, next) => {
  try {
    const id = Number.parseInt(req.params.id, 10);
    if (!Number.isInteger(id) || id <= 0) return res.status(400).json({ error: "invalid project id" });
    const deleted = await projectModel.removeById(id);
    if (!deleted) return res.status(404).json({ error: "project not found" });
    res.json({ message: "project deleted" });
  } catch (e) { next(e); }
};

module.exports = { getProjects, getProjectById, createProject, deleteProject };
