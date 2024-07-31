const express = require("express");
const router = express.Router();
const statisticsController = require("../controller/statisticsController");
const authenticateToken = require("../middleware/auth");

module.exports = router;