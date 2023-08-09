const genresRouter = require('express').Router();
const Joi = require('joi');

const checkJwt = require('../middlewares/checkJwt.JS');

const {
  findAll,
  findOneByName,
  insertGenre,
  deleteOneById,
  findOneById,
} = require('../models/genres');

const genreSchema = Joi.object({
  name: Joi.string().required(),
});

genresRouter.get('/', async (req, res) => {
  const [genres] = await findAll();
  res.json(genres);
});

genresRouter.get('/:id', async (req, res) => {
  const [[genre]] = await findOneById(req.params.id);
  res.json(genre);
});

genresRouter.post('/', checkJwt, async (req, res) => {
  const { value, error } = genreSchema.validate(req.body);

  if (error) {
    return res.status(400).json(error);
  }

  const [[genre]] = await findOneByName(value.name);

  if (genre) {
    return res.status(403).json({
      message: 'genre already exists',
    });
  }

  const [{ insertId }] = await insertGenre(value.name);

  return res.json({
    id: insertId,
    ...value,
  });
});

genresRouter.delete('/:id', checkJwt, async (req, res) => {
  const [{ affectedRows }] = await deleteOneById(req.params.id);
  if (affectedRows) {
    res.status(202);
  } else {
    res.status(204);
  }
  return res.json();
});

module.exports = genresRouter;
