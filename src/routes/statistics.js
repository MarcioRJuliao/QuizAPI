const express = require("express");
const router = express.Router();
const statisticsController = require("../controller/statisticsController");
const authenticateToken = require("../middleware/auth");
const myCache = require('../utils/cache');

module.exports = router;