const mongoose = require("mongoose");
const Course = require("./models/Course");
const dotenv = require("dotenv");

dotenv.config();
mongoose.connect(process.env.MONGO_URI);

const runSeed = async () => {
  try {
    await Course.deleteMany();

    await Course.insertMany([
      {
        title: "HTML Fundamentals",
        slug: "html-fundamentals",
        description: "Complete HTML Course",
        price: 0,
        category: "web",
        difficulty: "beginner",
        thumbnailUrl: "https://placehold.co/600x400",
        lessons: [
          { title: "Introduction to HTML", order: 1 },
          { title: "HTML Tags & Elements", order: 2 },
          { title: "Forms & Inputs", order: 3 },
        ],
      },
      {
        title: "JavaScript Basics",
        slug: "js-basics",
        description: "Learn JS from scratch",
        price: 199,
        category: "programming",
        difficulty: "beginner",
        thumbnailUrl: "https://placehold.co/600x400",
        lessons: [
          { title: "What is JavaScript?", order: 1 },
          { title: "Variables & Data Types", order: 2 },
          { title: "Functions in JS", order: 3 },
          { title: "Loops & Conditions", order: 4 },
        ],
      },
      {
        title: "Node.js Advanced",
        slug: "node-advanced",
        description: "Deep Node Concepts",
        price: 299,
        category: "backend",
        difficulty: "advanced",
        thumbnailUrl: "https://placehold.co/600x400",
        lessons: [
          { title: "Node Architecture", order: 1 },
          { title: "Event Loop", order: 2 },
          { title: "Streams & Buffers", order: 3 },
        ],
      },
      {
        title: "React Mastery",
        slug: "react-mastery",
        description: "Intermediate to advanced React",
        price: 399,
        category: "frontend",
        difficulty: "advanced",
        thumbnailUrl: "https://placehold.co/600x400",
        lessons: [
          { title: "React Basics Recap", order: 1 },
          { title: "Hooks Deep Dive", order: 2 },
          { title: "Performance Optimization", order: 3 },
        ],
      },
    ]);

    console.log("✅ Seed Data Inserted Successfully");
    process.exit();
  } catch (err) {
    console.log("❌ Seed Error:", err);
  }
};

runSeed();
