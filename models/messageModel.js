const pool = require("../config/db");

const getAll = async () => {
  const { rows } = await pool.query("SELECT id, name, email, company, message, created_at FROM messages ORDER BY created_at DESC, id DESC");
  return rows;
};

const create = async ({ name, email, company, message }) => {
  const { rows } = await pool.query(
    "INSERT INTO messages (name, email, company, message) VALUES ($1, $2, $3, $4) RETURNING id, name, email, company, message, created_at",
    [name, email, company || null, message]
  );
  return rows[0];
};

module.exports = { getAll, create };
