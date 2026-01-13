const User = require("../models/User");
const Course = require("../models/Course");
const Enrollment = require("../models/Enrollment");

const getReports = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalCourses = await Course.countDocuments();
    const totalEnrollments = await Enrollment.countDocuments();

    const beginnerCourses = await Course.countDocuments({ difficulty: "beginner" });
    const advancedCourses = await Course.countDocuments({ difficulty: "advanced" });

    res.json({
      totalUsers,
      totalCourses,
      totalEnrollments,
      beginnerCourses,
      advancedCourses
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to generate reports" });
  }
};

module.exports = { getReports };
