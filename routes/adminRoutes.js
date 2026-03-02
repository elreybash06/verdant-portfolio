const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");

// Dashboard page
router.get("/dashboard", adminController.renderDashboard);

// Services page
router.get("/services", adminController.renderAdminServices);

// Projects page
router.get("/projects", adminController.renderAdminProjects);

// Messages page
router.get("/messages", adminController.renderAdminMessages);

module.exports = router;