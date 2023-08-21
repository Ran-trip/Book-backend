const booksRouter = require("express").Router();
const multer = require("multer");
const checkJwt = require("../middlewares/checkJwt.JS");

const {
  insertBook,
  findAll,
  deleteBookById,
  updateBook,
  findOneBookById,
} = require("../models/books");

const upload = multer({ dest: "uploads/books/" });

//récupérer tout les books pour les lister a un endroit

booksRouter.get("/", async (req, res) => {
  const [books] = await findAll();
  res.json(books);
});

//appel du model dans ma route
//j'attends le résultat await
// revient sous forme de fonction
booksRouter.delete("/:id", checkJwt, async (req, res) => {
  const [{ affectedRows }] = await deleteBookById(req.params.id);
  if (affectedRows) {
    res.status(202);
  } else {
    res.status(204);
  }
  return res.json();
});

//controller
//enregistrer dans la db
//tout les informations dans req.body, l'image dans req.file
booksRouter.post("/", checkJwt, upload.single("picture"), async (req, res) => {
  console.log(req.body, req.file);
  const [{ insertId: id }] = await insertBook(req.body, req.file.path);

  res.json({
    ...req.body,
    id,
    picture: req.file.filename,
  });
});

booksRouter.get("/:id", async (req, res) => {
  const [[book]] = await findOneBookById(req.params.id);
  res.json(book);
});

booksRouter.put("/:id", checkJwt, upload.single("picture"), async (req, res) => {
  const bookId = req.params.id;
  const updatedData = req.body;
  const picturePath = req.file ? req.file.path : null;

  try {
    await updateBook(bookId, updatedData, picturePath);

    res.json({
      id: bookId,
      picture: picturePath || null,
      ...updatedData,
    });
  } catch (error) {
    console.error("Error updating book:", error);
    res
      .status(400)
      .json({ error: "An error occurred while updating the book." });
  }
});

module.exports = booksRouter;
