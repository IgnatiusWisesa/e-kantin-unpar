const mysql = require('mysql');

const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '12345',
	database: 'ekantin_unpar',
	multipleStatements: true
});

module.exports = db;
