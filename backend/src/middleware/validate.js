// ---------- AUTH VALIDATION ----------
const validateAuth = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ message: "name, email & password required" });
  }

  next();
};

// ---------- COURSE VALIDATION ----------
const validateCourse = (req, res, next) => {
  const { title, slug, price, category, difficulty, description } = req.body;

  if (
    !title ||
    !slug ||
    price === undefined ||
    !category ||
    !difficulty ||
    !description
  ) {
    return res.status(400).json({ message: "All course fields required" });
  }

  next();
};

// ---------- ENROLLMENT VALIDATION ----------
const validateEnrollment = (req, res, next) => {
  const { userId, courseId } = req.body;

  if (!userId || !courseId) {
    return res.status(400).json({ message: "userId & courseId required" });
  }

  next();
};

module.exports = {
  validateAuth,
  validateCourse,
  validateEnrollment,
};
