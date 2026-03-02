const teamMemberModel = require("../models/teamMemberModel");
const clean = (v) => (typeof v === "string" ? v.trim() : "");

const getTeamMembers = async (req, res, next) => {
  try { res.json(await teamMemberModel.getAll()); } catch (e) { next(e); }
};

const createTeamMember = async (req, res, next) => {
  try {
    const name = clean(req.body.name);
    const role = clean(req.body.role);
    const image = clean(req.body.image);
    const bio = clean(req.body.bio);
    if (!name || !role) return res.status(400).json({ error: "name and role are required" });
    res.status(201).json(await teamMemberModel.create({ name, role, image, bio }));
  } catch (e) { next(e); }
};

module.exports = { getTeamMembers, createTeamMember };
