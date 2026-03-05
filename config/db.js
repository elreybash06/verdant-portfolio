require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: Number.parseInt(process.env.DB_PORT, 10),
});

pool.query("SELECT 1")
  .then(() => console.log("PostgreSQL connected successfully"))
  .catch((error) => console.error("PostgreSQL connection error:", error.message));

module.exports = pool;