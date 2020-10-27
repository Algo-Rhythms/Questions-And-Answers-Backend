const { Client } = require('pg');

const connection = new Client({
  user: "postgres",
  password: "",
  database: "questionsandanswers",
  host: "localhost",
  port: 5432
});

module.exports = { connection };