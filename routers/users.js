const usersRouter = require('express').Router();
const Joi = require('joi');
const argon2 = require('argon2');
const { generateJwt } = require('../utils/auth');




const { findByEmail, insertUser } = require('../models/users');

// validation de données avec Joi
const userSchema = Joi.object({
    email: Joi.string().email({tlds: { allow: ['com', 'net']}}).required(),
    password: Joi.string().min(8).presence('required'),
});


// inserer la donnée dans la base
usersRouter.post('/', async (req, res) => {
    const { error, value } = userSchema.validate(req.body) // destructuration de la const validation user on a 2 keys : value, error
// si il y a une erreur retourne une erreur 400 a l'utilisateur et Json avec la liste des erreurs
// return peut arreter l'éxécution d'un code, il s'arrete directement à "error"    
    if (error){
        return res.status(400).json(error);

        //Vérifier si l'utilisateur existe déjà 
        // requete sur la table user
        //appelé une méthode findbyEmail
        // req récupé dans value
    } 
    // pour récupérer seulement l'utilisateur grace a une double destructuration
    const [[existingUser]] = await findByEmail(value.email);
 // si on a l'utilisateur existe on a une 409
    if (existingUser) {
        return res.status(409).json({
            message:'user already exists',
        })
    }
     //hash du password
    const hashedPassword = await argon2.hash(value.password);

    // Insérer dans la DB
    await insertUser(value.email, hashedPassword, 'ROLE_USER');
    
    // créer un JWT importé de utils/auth
    const jwtKey = generateJwt(value.email , 'ROLE_USER' );

    return res.json({
        credential: jwtKey,
    });
    
});

usersRouter.post('/login',  async (req, res) => {

    //vérifier les données de formulaire
    const { value, error } = userSchema.validate(req.body);
    
    if (error){
        return res.status(400).json(error);
    }
    //verifier si l'utilisateur existe
    // ou finByEmail(req.body.email)
    const [[existingUser]] = await findByEmail(value.email);
    // Si l'utilisateur n'existe pas on peut quitter
    if (!existingUser) {
        return res.status(403).json({
            message: "email ou mot de passe incorrect"
        });
    }
    // si c'est le cas, on vérifie son password
    // on lui passe le password existingUser.password et vérifier si c'est le meme value.password
    // argon2i verifie si le hash correspond au password en dur
    //true si c'est le vrai mot de passe
    const verified = await argon2.verify(existingUser.password, value.password, existingUser.role);
console.log(verified)
    if (!verified) {
        return res.status(403).json({
            message: "email ou mot de passe est incorrect"
        });
    }
    // si son password est bon, on lui donne un JWT :enlever le await devant genrateJwt
    const jwtKey = await generateJwt(value.email, value.role);

    return res.json({
        credential: jwtKey 
    });
}); 

module.exports = usersRouter;