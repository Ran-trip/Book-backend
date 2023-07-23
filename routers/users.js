const usersRouter = require('express').Router();
const Joi = require('joi');

const user = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().presence('required'),
    role: Joi.string().required(),
});



usersRouter.post('/', (req, res) => {
    const { error, value } = user.validate(req.body) // user on a 2 keys : value, error
    if (error){
        console.log(error)
    }   
    
    else {console.log(value)
    }
        
});

module.exports = usersRouter;