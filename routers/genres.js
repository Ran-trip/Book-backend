const genresRouter = require("express").Router();
const Joi = require("joi");

const checkJwt = require("../middlewares/checkJwt.JS");

const {
  findAll,
  findOneByName,
  insertGenre,
  deleteOneById,
  findOneById,
  updateGenre,
} = require("../models/genres");

const genreSchema = Joi.object({
  name: Joi.string().required(),
});

genresRouter.get("/", async (req, res) => {
  const [genres] = await findAll();
  res.json(genres);
});

genresRouter.get("/:id", async (req, res) => {
  try {
    const [[genre]] = await findOneById(req.params.id);
    if (genre) {
      res.json(genre);
    } else {
      res.status(404).json({ message: "Genre not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

genresRouter.post("/", async (req, res) => {
  const { value, error } = genreSchema.validate(req.body);

  if (error) {
    return res.status(400).json(error);
  }

  const [[genre]] = await findOneByName(value.name);

  if (genre) {
    return res.status(403).json({
      message: "genre already exists",
    });
  }

  const [{ insertId }] = await insertGenre(value.name);

  return res.json({
    id: insertId,
    ...value,
  });
});

genresRouter.delete("/:id", async (req, res) => {
  const [{ affectedRows }] = await deleteOneById(req.params.id);
  if (affectedRows) {
    res.status(202);
  } else {
    res.status(204);
  }
  return res.json();
});

genresRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    await updateGenre(id, name);
    res.status(200).send("genre updated !!");
  } catch (error) {
    console.log(error);
    res.status(500).send("error occur on updating");
  }
});

module.exports = genresRouter;
