const serviceModel = require("../models/serviceModel");
const clean = (v) => (typeof v === "string" ? v.trim() : "");

const getServices = async (req, res, next) => {
  try { res.json(await serviceModel.getAll()); } catch (e) { next(e); }
};

const createService = async (req, res, next) => {
  try {
    const title = clean(req.body.title);
    const description = clean(req.body.description);
    const icon = clean(req.body.icon);
    if (!title || !description) return res.status(400).json({ error: "title and description are required" });
    res.status(201).json(await serviceModel.create({ title, description, icon }));
  } catch (e) { next(e); }
};

const deleteService = async (req, res, next) => {
  try {
    const id = Number.parseInt(req.params.id, 10);
    if (!Number.isInteger(id) || id <= 0) return res.status(400).json({ error: "invalid service id" });
    const deleted = await serviceModel.removeById(id);
    if (!deleted) return res.status(404).json({ error: "service not found" });
    res.json({ message: "service deleted" });
  } catch (e) { next(e); }
};

module.exports = { getServices, createService, deleteService };
