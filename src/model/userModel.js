var database = require("../database/config");

function getAll() {
    const query = "SELECT user_id, email, name FROM user";
    return database.execute({ query });
}

function create(user) {
    const query = "INSERT INTO user (name, email, password) VALUES (?, ?, ?)";
    const params = [user.name, user.email, user.password];
    return database.execute({ query, params });
}

function login(user) {
    const query = "SELECT user_id, email, name, password FROM user WHERE email = ?";
    const params = [user.email];
    return database.execute({ query, params });
}

function getById(id) {
    const query = "SELECT user_id, email, name FROM user WHERE user_id = ?";
    const params = [id];
    return database.execute({ query, params });
}

function updateName(user) {
    const query = "UPDATE user SET name = ? WHERE user_id = ?";
    const params = [user.name, user.user_id];
    return database.execute({ query, params });
}

function updatePassword(user) {
    const query = "UPDATE user SET password = ? WHERE user_id = ?";
    const params = [user.password, user.user_id];
    return database.execute({ query, params });
}

function deleteUser(user) {
    const query = "DELETE FROM user WHERE user_id = ?";
    const params = [user.user_id];
    return database.execute({ query, params });
}

module.exports = { getAll, create, login, getById, updateName, updatePassword, deleteUser };
