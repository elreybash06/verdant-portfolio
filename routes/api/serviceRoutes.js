const express = require("express");
const router = express.Router();
const c = require("../../controllers/serviceController");
router.get("/", c.getServices);
router.post("/", c.createService);
router.delete("/:id", c.deleteService);
module.exports = router;
