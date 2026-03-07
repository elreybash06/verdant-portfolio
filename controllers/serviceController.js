const serviceModel = require("../models/serviceModel");

// Get all services
const getServices = async (req, res, next) => {
  try {
    const services = await serviceModel.getAll();
    res.json(services);
  } catch (error) {
    next(error);
  }
};

// Create service
const createService = async (req, res, next) => {
  try {
    const { title, description, icon } = req.body;
    if (!title || !description) {
      return res.status(400).json({ error: "Title and description are required" });
    }

    const newService = await serviceModel.create({ title, description, icon });
    res.status(201).json(newService);
  } catch (error) {
    next(error);
  }
};

// Delete service
const deleteService = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ error: "Invalid service id" });
    }
    const deleted = await serviceModel.removeById(id);
    if (!deleted) {
      return res.status(404).json({ error: "Service not found" });
    }
    res.json({ message: "Service deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getServices,
  createService,
  deleteService
};
