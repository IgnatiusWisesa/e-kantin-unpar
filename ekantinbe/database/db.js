const mysql = require('mysql');

const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'bobby141294',
	database: 'ekantin_unpar',
	multipleStatements: true
});

module.exports = db;
