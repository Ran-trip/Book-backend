const mysql = require('mysql2');

require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

connection.connect((err) => {
    if (err) console.log('Mysql connection error: ', err);
    else console.log('Mysql connected');
  });

module.exports = connection;

// a chaque fois que j'importe connection, celà va créer une connexion mysql pour acceder à la base de donnée
