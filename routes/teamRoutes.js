const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Team route working");
});

module.exports = router;