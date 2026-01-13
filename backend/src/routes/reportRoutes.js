const express = require("express");
const { auth, adminOnly } = require("../middleware/auth");
const { getReports } = require("../controllers/reportController");

const router = express.Router();

router.get("/", auth, adminOnly, getReports);

module.exports = router;
