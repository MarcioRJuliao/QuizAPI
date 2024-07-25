var database = require("../database/config");

function getAll() {

    const query = "SELECT * FROM user";
    return database.execute(query);

}

module.exports = { getAll };

