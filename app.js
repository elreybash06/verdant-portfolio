require("dotenv").config();
const express = require("express");
const app = express();

const pool = require("./config/db");

app.get("/", (req, res) => {
  res.send("Verdant Tech Portfolio Backend is running!");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM public.services");
    res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Database error" });
    }
    });