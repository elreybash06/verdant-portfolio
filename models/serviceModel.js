const pool = require("../config/db");

const getAll = async () => {
  const { rows } = await pool.query("SELECT id, title, description, icon, created_at FROM services ORDER BY created_at DESC, id DESC");
  return rows;
};

const create = async ({ title, description, icon }) => {
  const { rows } = await pool.query(
    "INSERT INTO services (title, description, icon) VALUES ($1, $2, $3) RETURNING id, title, description, icon, created_at",
    [title, description, icon || null]
  );
  return rows[0];
};

const removeById = async (id) => {
  const { rows } = await pool.query("DELETE FROM services WHERE id = $1 RETURNING id", [id]);
  return rows[0] || null;
};

module.exports = { getAll, create, removeById };
