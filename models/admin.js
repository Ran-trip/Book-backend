const connection = require('../connexion');

const findAdmin = (email, password, role) => (connection.promise().query('SELECT * FROM users WHERE email =?', [email, password, role ]));

module.exports = {
    findAdmin,
  };
  