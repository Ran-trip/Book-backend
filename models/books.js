const connection = require("../connexion");

const findAll = () => connection.promise().query("SELECT * FROM books");

//objet comme premier argument, file comme deuxieme argument
const insertBook = ({ name, description, releaseDate }, picture) =>
  connection
    .promise()
    .query(
      "INSERT INTO books (`name`, `description`,`releaseDate`, `picture`) VALUES (?, ?, ? ,? )",
      [name, description, releaseDate, picture]
    );

module.exports = {
  insertBook,
  findAll,
};
