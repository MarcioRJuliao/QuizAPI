var express = require("express");
var router = express.Router();

var userController = require("../controller/userController");

router.get("/getAll", function (req, res) {
    userController.getAll(req, res);
})

router.post("/create", function (req, res) {
    userController.create(req, res);
})

router.post("/login", function (req, res) {
    userController.login(req, res);
})

router.get("/getById/:id", function (req, res) {
    userController.getById(req, res);
})

module.exports = router;