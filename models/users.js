const connection = require("../connexion");
// appel à la base de données
// ? remplacé par email
const findByEmail = (email) =>
  connection.promise().query("SELECT * FROM users WHERE email =?", [email]);

const insertUser = (email, password, role) =>
  connection
    .promise()
    .query("INSERT INTO users (email, password, role) VALUES (?, ?, ?)", [
      email,
      password,
      role,
    ]);

module.exports = {
  findByEmail,
  insertUser,
};
