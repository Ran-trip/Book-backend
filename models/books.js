const connection = require("../connexion");

const findAll = () => connection.promise().query("SELECT * FROM books");

//objet comme premier argument, file comme deuxieme argument

// insertBook = ({name: rober, description: livre, releaseDate: 11.02.2022 ...})
const insertBook = ({ name, description, releaseDate }, picture) =>
  connection
    .promise()
    .query(
      "INSERT INTO books (`name`, `description`,`releaseDate`, `picture`) VALUES (?, ?, ? ,? )",
      [name, description, releaseDate, picture]
    );

    // delete from name table condition
const deleteBookById = (id) => connection.promise().query('DELETE FROM books WHERE id = ?', [id]);

const updateBookById = (id, { name, description, releaseDate }, picture) =>
  connection
    .promise()
    .query(
      "UPDATE books SET `name` = ?, `description` = ?, `releaseDate` = ?, `picture` = ? WHERE id = ?",
      [name, description, releaseDate, picture, id]
    );

module.exports = {
  insertBook,
  findAll,
  deleteBookById,
  updateBookById,
};
