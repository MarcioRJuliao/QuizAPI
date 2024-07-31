const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const authenticateToken = require("../middleware/auth");

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

router.get('/protected', authenticateToken, function (req, res) {
    res.status(200).send(`Bem-vindo ${req.user.email}!`);
});

module.exports = router;