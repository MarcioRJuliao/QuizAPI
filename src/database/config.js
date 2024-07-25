const mysql = require('mysql2');

var mySqlConfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
};

function execute(query) {

    if (query == null || query == undefined) 
        throw new Error('A Query SQL está nula ou indefinida');
    
    return new Promise(function (resolve, reject) {
        var connection = mysql.createConnection(mySqlConfig);
        connection.connect();

        connection.query(query, function (error, results, fields) {
            connection.end();
            if (error) {
                reject(error);
            }
            console.log(results, fields);
            resolve(results);
        });
        connection.on('error', function (error) {
            return ("Erro na execução da query: ", error.sqlMessage);
        });
    });

}

module.exports = { execute };