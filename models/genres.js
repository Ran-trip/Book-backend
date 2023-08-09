const connection = require('../connexion');

const findAll = () => connection.promise().query('SELECT * FROM genres');

const findOneById = (id) => connection.promise().query('SELECT * FROM genres WHERE id = ?', [id]);

const findOneByName = (name) => connection.promise().query('SELECT * FROM genres WHERE name = ?', [name]);

const insertGenre = (name) => connection.promise().query('INSERT INTO genres (`name`) VALUES (?)', [name]);

const deleteOneById = (id) => connection.promise().query('DELETE FROM genres WHERE id = ?', [id]);

module.exports = {
  findAll,
  findOneByName,
  insertGenre,
  deleteOneById,
  findOneById,
};
