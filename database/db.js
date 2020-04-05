const mysql = require('mysql');

const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '*****',
	database: 'ekantin_unpar',
	multipleStatements: true
});

module.exports = db;
