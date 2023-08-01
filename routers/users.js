const usersRouter = require('express').Router();
const Joi = require('joi');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const { findByEmail, insertUser } = require('../models/users')

const user = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().presence('required'),
});


// inserer la donnée dans la base
usersRouter.post('/', async (req, res) => {
    const { error, value } = user.validate(req.body) // user on a 2 keys : value, error
    if (error){
        return res.status(400).json(error);

    } 
    const [[existingUser]] = await findByEmail(value.email);
    if (existingUser) {
        return res.status(409).json({
            message:'user already exists',
        })
    }
     //hash du password
    const hashedPassword = await argon2.hash(value.password);

    // Insérer dans la DB
    await insertUser(value.email, hashedPassword, 'ROLE_USER');
    
    //lui créer un JWT
    const jwtKey = generateJwt(value.email, 'ROLE_USER');

    return res.json({
        Credential: jwtKey,
    });
        
});

module.exports = usersRouter;