const express = require("express");
const router = express.Router();
const c = require("../../controllers/adminController");
router.get("/", c.renderDashboard);
router.get("/services", c.renderAdminServices);
router.get("/projects", c.renderAdminProjects);
router.get("/messages", c.renderAdminMessages);
module.exports = router;
