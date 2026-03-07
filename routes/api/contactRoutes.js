const express = require("express");
const router = express.Router();
const c = require("../../controllers/messageController");
router.post("/contact", c.submitContact);
module.exports = router;
