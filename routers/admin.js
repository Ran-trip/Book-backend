const adminRouter = require('express').Router();
const Joi = require('joi');
const argon2 = require('argon2');
const { generateJwt } = require('../utils/auth');

const { findAdmin } = require('../models/admin');

const checkJwt = require('../middlewares/checkJwt.JS')



const userSchema = Joi.object({
    email: Joi.string().email({tlds: { allow: ['com', 'net']}}).required(),
    password: Joi.string().min(8).presence('required'),

});

adminRouter.post('/login', checkJwt, async (req, res) => {


    const { value, error } = userSchema.validate(req.body);
    
    if (error){
        return res.status(400).json(error);
    }
 
    const [[existingUser]] = await findAdmin(value.email, value.password);

 
    if (!existingUser) {
        return res.status(403).json({
            message: "email ou mot de passe incorrect"
        });
    }
    

    const verified = await argon2.verify(existingUser.password, value.password);

    if (!verified) {
        return res.status(403).json({
            message: "email ou mot de passe est incorrect"
        });
    }

    const userRole = existingUser.role;

    const jwtKey = await generateJwt(value.email, userRole);
    // console.log(value)

    return res.json({
        role: userRole,
        credential: jwtKey
        
    });
}); 


module.exports = adminRouter;