const connection = require("../connexion");

const findAdmin = (email) =>
  connection.promise().query("SELECT * FROM admin WHERE email =?", [email]);

module.exports = {
  findAdmin,
};
