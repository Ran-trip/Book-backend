const booksRouter = require("express").Router();

//controller
booksRouter.post("/",  (req, res) =>
  res.json('books'));
;

module.exports = booksRouter;
