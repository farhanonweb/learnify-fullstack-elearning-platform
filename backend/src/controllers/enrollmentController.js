const Enrollment = require("../models/Enrollment");
const Course = require("../models/Course");

const enrollUser = async (req, res) => {
  try {
    const { userId, courseId } = req.body;

    const enrollment = await Enrollment.create({
      userId,
      courseId,
      progress: {},
    });

    res.json({ message: "Enrolled successfully", enrollment });
  } catch {
    res.status(500).json({ message: "Enrollment failed" });
  }
};

const getMyEnrollments = async (req, res) => {
  try {
    const data = await Enrollment.find({ userId: req.params.userId });
    res.json(data);
  } catch {
    res.status(500).json({ message: "Failed to fetch enrollments" });
  }
};

const updateProgress = async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id);
    enrollment.progress = req.body.progress;

    const course = await Course.findById(enrollment.courseId);
    const total = course.lessons.length;
    const completed = Object.keys(enrollment.progress || {}).length;

    if (total > 0 && completed === total) {
      enrollment.certificateIssued = true;
    }

    await enrollment.save();
    res.json(enrollment);
  } catch {
    res.status(500).json({ message: "Progress update failed" });
  }
};

module.exports = { enrollUser, getMyEnrollments, updateProgress };
