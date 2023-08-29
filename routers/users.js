const usersRouter = require("express").Router();
const Joi = require("joi");
const argon2 = require("argon2");
const { generateJwt } = require("../utils/auth");

const { findByEmail, insertUser } = require("../models/users");

// Schéma de validation de données utilisateur avec Joi
const userSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: ["com", "net"] } })
    .required(),
  //Validation du mot de passe qui nécessite au moins 8 caractères
  password: Joi.string().min(8).presence("required"),
});

// Route pour l'inscription d'un nouvel utilisateur
usersRouter.post("/", async (req, res) => {
  // destructuration req.body validé par Joi
  const { error, value } = userSchema.validate(req.body);
  // en cas d'erreur une erreur 400 est envoyé avec la liste des erreurs
  if (error) {
    return res.status(400).json(error);
  }
  //On vérifie si l'utilisateur existe déjà
  const [[existingUser]] = await findByEmail(value.email);
  // si on a l'utilisateur existe on a une 409
  if (existingUser) {
    return res.status(409).json({
      message: "user already exists",
    });
  }
  //hash du password
  const hashedPassword = await argon2.hash(value.password);

  // Insérer dans la DB
  await insertUser(value.email, hashedPassword, "ROLE_USER");

  // création d'un JWT importé de utils/auth
  const jwtKey = generateJwt(value.email, "ROLE_USER");
  //Retourne le JWT au front-end pour l'authentification ultérieure
  return res.json({
    credential: jwtKey,
  });
});
//route pour la connexion d'un utilisateur existant
usersRouter.post("/login", async (req, res) => {
  //vérifier les données de formulaire
  const { value, error } = userSchema.validate(req.body);

  if (error) {
    return res.status(400).json(error);
  }
  //verifier si l'utilisateur existe
  const [[existingUser]] = await findByEmail(value.email);
  if (!existingUser) {
    return res.status(403).json({
      message: "email ou mot de passe incorrect",
    });
  }
  // si l'utilasateur existe 
  // on lui passe le password existingUser.password et vérifier si c'est le meme value.password
  // et argon2i verifie si le hash correspond au password en dur
  const verified = await argon2.verify(existingUser.password, value.password);
  console.log(verified);
  if (!verified) {
    return res.status(403).json({
      message: "email ou mot de passe est incorrect",
    });
  }
  // si son password est bon, on lui donne un JWT
  const jwtKey = await generateJwt(value.email, value.role);

  return res.json({
    credential: jwtKey,
  });
});

module.exports = usersRouter;
