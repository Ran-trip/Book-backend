const booksRouter = require('express').Router();
const { findAll } = require('../models/books');

//controller
booksRouter.get('/', async (req, res) => {
    const [books] = await findAll();
    res.json(books);
});

module.exports =
    booksRouter
;