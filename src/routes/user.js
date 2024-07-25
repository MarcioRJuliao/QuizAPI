var express = require("express");
var router = express.Router();

var userController = require("../controller/userController");

router.get("/getAll", function (req, res) {
    userController.getAll(req, res);
})

module.exports = router;