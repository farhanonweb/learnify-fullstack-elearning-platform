const express = require("express");
const { auth, adminOnly } = require("../middleware/auth");
const uploadCertificate = require("../middleware/uploadCertificate");
const Course = require("../models/Course");

const {
  getAllCourses,
  getCourseBySlug,
  createCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController");

const router = express.Router();

// public
router.get("/", getAllCourses);
router.get("/:slug", getCourseBySlug);

// admin
router.post("/", auth, adminOnly, createCourse);
router.put("/:id", auth, adminOnly, updateCourse);
router.delete("/:id", auth, adminOnly, deleteCourse);

router.post(
  "/:id/certificate",
  auth,
  adminOnly,
  uploadCertificate.single("certificate"),
  async (req, res) => {
    try {
      const course = await Course.findById(req.params.id);
      if (!course) return res.status(404).json({ message: "Course not found" });

      course.certificateFile = req.file.path;
      await course.save();

      res.json({ message: "Certificate uploaded", file: course.certificateFile });
    } catch (err) {
      res.status(500).json({ message: "Upload failed" });
    }
  }
);

module.exports = router;
