const booksRouter = require("express").Router();
const multer = require("multer");
const { insertBook, findAll, deleteBookById } = require("../models/books");


const upload = multer({ dest: "uploads/books/" });

//récupérer tout les books pour les lister a un endroit

booksRouter.get("/", async (req, res) => {
  const [books] = await findAll();
  res.json(books);
});

//appel du model dans ma route
booksRouter.delete('/:id', async (req, res) => {
  //j'attends le résultat await
  // revient sous forme de fonction
  const [{affectedRows }] = await deleteBookById(req.params.id);
  if (affectedRows) {
    res.status(202);
  } else {
    res.status(204);
  }
  return res.json();
});

//controller
booksRouter.post("/",  upload.single("picture"), async (req, res) => {
  console.log(req.body, req.file);
  const [{ insertId: id }] = await insertBook(req.body, req.file.path);

  //enregistrer dans la db
  //tout les informations dans req.body, l'image dans req.file
  res.json({
    ...req.body,
    id,
    picture: req.file.filename,
  });
});
module.exports = booksRouter;
