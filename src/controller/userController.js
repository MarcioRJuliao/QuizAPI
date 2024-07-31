var userModel = require("../model/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const myCache = require('../utils/cache');

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

        if (user.password.length < 8) {
            return res.status(400).send('A senha deve ter no mínimo 8 caracteres');
        } 

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(user.password, saltRounds);

        const userWithHashedPassword = { ...user, password: hashedPassword };

        const result = await userModel.create(userWithHashedPassword);

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
        const { email, password } = req.body;
        const result = await userModel.login({ email });

        if (result.length === 0) {
            return res.status(404).send('Usuário não encontrado');
        }

        const user = result[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).send('Senha incorreta');
        }

        const token = jwt.sign({ userId: user.user_id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        myCache.set(user.user_id, { email: user.email, name: user.name });

        console.log ('Logado com sucesso!');
        return res.status(200).json({ token });

    } catch (e) {
        console.log('Erro na execução do login:', e);
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