const serviceModel = require("../models/serviceModel");
const projectModel = require("../models/projectModel");
const teamMemberModel = require("../models/teamMemberModel");

const renderHome = async (req, res, next) => {
  try {
    const [services, projects] = await Promise.all([serviceModel.getAll(), projectModel.getAll()]);
    res.render("public/home", { title: "Verdant Technologies", services: services.slice(0, 3), projects: projects.slice(0, 3) });
  } catch (e) { next(e); }
};

const renderAbout = async (req, res, next) => {
  try { res.render("public/about", { title: "About", teamMembers: await teamMemberModel.getAll() }); } catch (e) { next(e); }
};

const renderServices = async (req, res, next) => {
  try { res.render("public/services", { title: "Services", services: await serviceModel.getAll() }); } catch (e) { next(e); }
};

const renderProjects = async (req, res, next) => {
  try { res.render("public/projects", { title: "Projects", projects: await projectModel.getAll() }); } catch (e) { next(e); }
};

const renderProjectDetail = async (req, res, next) => {
  try {
    const id = Number.parseInt(req.params.id, 10);
    if (!Number.isInteger(id) || id <= 0) return res.status(404).render("shared/partials/not-found", { title: "Not Found", message: "Project not found" });
    const project = await projectModel.getById(id);
    if (!project) return res.status(404).render("shared/partials/not-found", { title: "Not Found", message: "Project not found" });
    res.render("public/project-detail", { title: project.title, project });
  } catch (e) { next(e); }
};

const renderContact = (req, res) => res.render("public/contact", { title: "Contact" });

module.exports = { renderHome, renderAbout, renderServices, renderProjects, renderProjectDetail, renderContact };
