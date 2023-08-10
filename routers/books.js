const booksRouter = require("express").Router();
const multer = require("multer");
const { insertBook, findAll } = require("../models/books");

const upload = multer({ dest: "uploads/books/" });

//récupérer tout les books pour les lister a un endroit

booksRouter.get("/", async (req, res) => {
  const [books] = await findAll();
  res.json(books);
});

//controller
booksRouter.post("/", upload.single("picture"), async (req, res) => {
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
