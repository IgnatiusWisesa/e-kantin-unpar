const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "kenang",
  password: "bahagia",
  database: "ekantin_unpar",
  multipleStatements: true,
});

module.exports = db;
