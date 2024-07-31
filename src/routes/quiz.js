const express = require("express");
const router = express.Router();
const quizController = require("../controller/quizController");
const authenticateToken = require("../middleware/auth");

module.exports = router;