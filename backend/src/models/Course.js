const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
  title: String,
  contentHtml: String,
  videoUrl: String,
  order: Number,
});

const courseSchema = new mongoose.Schema(
  {
    title: String,
    slug: String,
    description: String,
    price: Number,
    category: String,
    difficulty: String,
    thumbnailUrl: String,
    certificateFile: String,

    lessons: [lessonSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
