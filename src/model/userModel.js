var database = require("../database/config");

function getAll() {
    const query = "SELECT * FROM user";
    return database.execute(query);
}

function create(user) {
    const query = "INSERT INTO user (name, email, password) VALUES (?, ?, ?)";
    const params = [user.name, user.email, user.password];
    return database.execute({ query, params });
}

function login(user) {
    const query = "SELECT * FROM user WHERE email = ? AND password = ?";
    const params = [user.email, user.password];
    return database.execute({ query, params });
}

function getById(id) {
    const query = "SELECT * FROM user WHERE user_id = ?";
    const params = [id];
    return database.execute({ query, params });
}

module.exports = { getAll, create, login, getById };
