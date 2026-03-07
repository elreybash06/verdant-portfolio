const serviceModel = require("../models/serviceModel");
const projectModel = require("../models/projectModel");
const messageModel = require("../models/messageModel");

const renderDashboard = async (req, res, next) => {
  try {
    const [services, projects, messages] = await Promise.all([serviceModel.getAll(), projectModel.getAll(), messageModel.getAll()]);
    res.json({
      message: "Admin dashboard data",
      stats: { services: services.length, projects: projects.length, messages: messages.length },
      recentMessages: messages.slice(0, 5),
      recentServices: services.slice(0, 5),
      recentProjects: projects.slice(0, 5),
    });
  } catch (e) { next(e); }
};

const renderAdminServices = async (req, res, next) => {
  try { res.json(await serviceModel.getAll()); } catch (e) { next(e); }
};
const renderAdminProjects = async (req, res, next) => {
  try { res.json(await projectModel.getAll()); } catch (e) { next(e); }
};
const renderAdminMessages = async (req, res, next) => {
  try { res.json(await messageModel.getAll()); } catch (e) { next(e); }
};

module.exports = { renderDashboard, renderAdminServices, renderAdminProjects, renderAdminMessages };
