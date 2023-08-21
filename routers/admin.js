const adminRouter = require("express").Router();
const Joi = require("joi");
const { generateJwt } = require("../utils/auth");

const { findAdmin } = require("../models/admin");

const checkJwt = require("../middlewares/checkJwt.JS");

const userSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: ["com", "net"] } })
    .required(),
  password: Joi.string().min(8).presence("required"),
});
// Route de connexion pour l'administrateur avec un middleware de vérification JWT
adminRouter.post("/login", checkJwt, async (req, res) => {
  const { value, error } = userSchema.validate(req.body);
// cas d'erreur de validation, renvoie une réponse avec les erreurs 
  if (error) {
    return res.status(400).json(error);
  }
//recherche du email de l'administrateur
  const [[existingUser]] = await findAdmin(value.email);
// si ce n'est pas l'adminsitrateur, cela renvoir une réponse avec un message d'erreur
  if (!existingUser) {
    return res.status(403).json({
      message: "email ou mot de passe incorrect",
    });
  }
// si son password est bon on lui donne un nouveau JWT
  const jwtKey = await generateJwt(value.email, "ROLE_ADMIN");

  return res.json({
    credential: jwtKey,
  });
});

module.exports = adminRouter;
