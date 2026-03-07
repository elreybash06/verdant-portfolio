const pool = require("../config/db");

const getAll = async () => {
  const { rows } = await pool.query("SELECT id, title, description, tech_stack, image, demo_link, created_at FROM projects ORDER BY created_at DESC, id DESC");
  return rows;
};

const getById = async (id) => {
  const { rows } = await pool.query("SELECT id, title, description, tech_stack, image, demo_link, created_at FROM projects WHERE id = $1", [id]);
  return rows[0] || null;
};

const create = async ({ title, description, techStack, image, demoLink }) => {
  const { rows } = await pool.query(
    "INSERT INTO projects (title, description, tech_stack, image, demo_link) VALUES ($1, $2, $3, $4, $5) RETURNING id, title, description, tech_stack, image, demo_link, created_at",
    [title, description, techStack, image || null, demoLink || null]
  );
  return rows[0];
};

const removeById = async (id) => {
  const { rows } = await pool.query("DELETE FROM projects WHERE id = $1 RETURNING id", [id]);
  return rows[0] || null;
};

const update = async (id, { title, description, techStack, image, demoLink }) => {
  const existing = await getById(id);
  if (!existing) return null;

  const nextTitle = title ?? existing.title;
  const nextDescription = description ?? existing.description;
  const nextTechStack = techStack ?? existing.tech_stack;
  const nextImage = image ?? existing.image;
  const nextDemoLink = demoLink ?? existing.demo_link;

  const { rows } = await pool.query(
    "UPDATE projects SET title = $1, description = $2, tech_stack = $3, image = $4, demo_link = $5 WHERE id = $6 RETURNING id, title, description, tech_stack, image, demo_link, created_at",
    [nextTitle, nextDescription, nextTechStack, nextImage, nextDemoLink, id]
  );
  return rows[0] || null;
};

const remove = async (id) => removeById(id);

module.exports = { getAll, getById, create, update, removeById, delete: remove };
