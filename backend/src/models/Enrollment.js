const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema(
  {
    userId: mongoose.Schema.Types.ObjectId,
    courseId: mongoose.Schema.Types.ObjectId,
    progress: Object,

    certificateIssued: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Enrollment", enrollmentSchema);
