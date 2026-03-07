const express = require("express");
const router = express.Router();
const c = require("../../controllers/messageController");
router.get("/messages", c.getMessages);
module.exports = router;
