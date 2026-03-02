const pool = require("../config/db");

const getAll = async () => {
  const { rows } = await pool.query("SELECT id, name, role, image, bio FROM team_members ORDER BY id ASC");
  return rows;
};

const create = async ({ name, role, image, bio }) => {
  const { rows } = await pool.query(
    "INSERT INTO team_members (name, role, image, bio) VALUES ($1, $2, $3, $4) RETURNING id, name, role, image, bio",
    [name, role, image || null, bio || null]
  );
  return rows[0];
};

module.exports = { getAll, create };
