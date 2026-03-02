const messageModel = require("../models/messageModel");
const clean = (v) => (typeof v === "string" ? v.trim() : "");

const submitContact = async (req, res, next) => {
  try {
    const name = clean(req.body.name);
    const email = clean(req.body.email);
    const company = clean(req.body.company);
    const message = clean(req.body.message);
    if (!name || !email || !message) return res.status(400).json({ error: "name, email and message are required" });
    res.status(201).json({ message: "Message sent successfully", data: await messageModel.create({ name, email, company, message }) });
  } catch (e) { next(e); }
};

const getMessages = async (req, res, next) => {
  try { res.json(await messageModel.getAll()); } catch (e) { next(e); }
};

module.exports = { submitContact, getMessages };
