module.exports = (req, res, next) => {
  const isAdmin = true; // Replace later with real auth logic

  if (!isAdmin) {
    return res.status(403).json({ message: "Access denied" });
  }

  next();
};