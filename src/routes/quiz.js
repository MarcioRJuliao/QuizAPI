const express = require("express");
const router = express.Router();
const quizController = require("../controller/quizController");
const authenticateToken = require("../middleware/auth");
const myCache = require('../utils/cache');

module.exports = router;