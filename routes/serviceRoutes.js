const express = require("express");
const router = express.Router();

const serviceController = require("../controllers/serviceController");

// Get all services
router.get("/", serviceController.getServices);

// Create service
router.post("/", serviceController.createService);

// Delete service
router.delete("/:id", serviceController.deleteService);

module.exports = router;