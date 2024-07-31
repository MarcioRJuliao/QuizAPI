var userModel = require("../model/userModel");

async function getAll(req, res) {

    try {
       const users = await userModel.getAll();

        if (users.length === 0) {
            return res.status(404).send('Nenhum usuário encontrado');
        } else if (users.length > 0) {
            return res.status(200).send(users);
        }

    } catch (e) {
        console.log('Erro na execução do getAll:', e, e.sqlMessage);
        res.status(500).send('Erro na execução do getAll');
    }

}

async function create(req, res) {

    try {
        const user = req.body;
        const result = await userModel.create(user);

        if (result.affectedRows > 0) {
            return res.status(201).send('Usuário criado com sucesso');
        } else {
            return res.status(400).send('Erro ao criar usuário');
        }

    } catch (e) {
        console.log('Erro na execução do create:', e, e.sqlMessage);
        res.status(500).send('Erro na execução do create');
    }

}

async function login(req, res) {

    try {
        const user = req.body;
        const result = await userModel.login(user);

        if (result.length === 0) {
            return res.status(404).send('Usuário não encontrado');
        } else if (result.length > 0) {
            return res.status(200).send(result);
        }

    } catch (e) {
        console.log('Erro na execução do login:', e, e.sqlMessage);
        res.status(500).send('Erro na execução do login');
    }

}

async function getById(req, res) {

    try {
        const id = req.params.id;
        const result = await userModel.getById(id);

        if (result.length === 0) {
            return res.status(404).send('Usuário não encontrado');
        } else if (result.length > 0) {
            return res.status(200).send(result);
        }

    } catch (e) {
        console.log('Erro na execução do getById:', e, e.sqlMessage);
        res.status(500).send('Erro na execução do getById');
    }

}

module.exports = { getAll, create, login, getById };