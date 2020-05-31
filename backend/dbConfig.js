const mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: 100,
  port: "3306",
  // host: "database-1.cjxz8c5b9z40.us-west-1.rds.amazonaws.com",
  host: "database-1.cwspngijje9n.us-east-1.rds.amazonaws.com",
  user: "admin",
  // password: "taradatabase",
  password: "tara2020",
  database: "taradatabase",
  debug: false,
  multipleStatements: true,
});

module.exports = pool;
