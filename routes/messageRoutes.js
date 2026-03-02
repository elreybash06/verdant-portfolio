const express = require("express");
const router = express.Router();

const messageController = require("../controllers/messageController");

// Get all messages (admin)
router.get("/", messageController.getMessages);

// Submit contact message (public)
router.post("/", messageController.submitContact);
// deleting messages
router.delete("/:id", messageController.deleteMessage);

module.exports = router;