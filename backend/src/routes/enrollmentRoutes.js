const express = require("express");
const { auth } = require("../middleware/auth");
const { validateEnrollment } = require("../middleware/validate");
const {
  enrollUser,
  getMyEnrollments,
  updateProgress,
} = require("../controllers/enrollmentController");

const router = express.Router();

// ENROLL IN COURSE
router.post("/enroll", auth, validateEnrollment, enrollUser);

// GET MY ENROLLMENTS
router.get("/me/:userId", auth, getMyEnrollments);

// UPDATE PROGRESS
router.put("/:id/progress", auth, updateProgress);

module.exports = router;
