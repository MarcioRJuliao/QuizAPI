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

module.exports = { getAll };