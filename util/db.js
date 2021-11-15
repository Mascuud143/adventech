const mysql = require("mysql2");

const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  database: process.env.DATABASE,
  password: process.env.DB_PASSWORD,
});

module.exports = connection.promise();
