var mysql = require('mysql');

var host, user, password, database;
/*
if (process.env.USER == 'adriano') {
    host = 'localhost';
    user = 'adriano';
    password = '453231';
    database = 'qss';
} else {
    host = 'mysql.combinado.kinghost.net';
    user = 'combinado';
    password = '2019081117664532Ad';
    database = 'combinado';
}
*/
host = 'localhost';
user = 'adriano';
password = '453231';
database = 'combinado';

var connect = function() {
    return mysql.createPool({
        connectionLimit: 1000,
        host: host,
        user: user,
        password: password,
        database: database,
        multipleStatements: true,
    });
}

module.exports = function() {
    return connect;
}