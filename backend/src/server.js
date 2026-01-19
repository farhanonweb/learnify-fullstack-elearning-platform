const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();

/* ✅ CORS */
app.use(
  cors({
    origin: "*", // baad me frontend URL dalenge
    credentials: true,
  })
);

app.use(express.json());

/* ✅ Static uploads */
app.use(
  "/uploads",
  express.static(path.join(__dirname, "..", "uploads"))
);

/* ✅ Routes */
const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");
const enrollmentRoutes = require("./routes/enrollmentRoutes");
const reportRoutes = require("./routes/reportRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/reports", reportRoutes);

/* ✅ Test Route */
app.get("/", (req, res) => {
  res.send("E-Learning Backend Running 🚀");
});

/* ✅ PORT FIX (Render ke liye) */
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(console.error);

module.exports = app;
