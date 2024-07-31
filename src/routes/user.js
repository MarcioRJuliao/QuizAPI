const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const authenticateToken = require("../middleware/auth");
const myCache = require('../utils/cache');

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
    const userId = req.user.userId;
    const userData = myCache.get(userId);

    userdata ? res.status(200).send(`Bem-vindo ${userData.name} (${userData.email})!`) : res.status(404).send('Dados do usuário não encontrados no cache');

});

module.exports = router;