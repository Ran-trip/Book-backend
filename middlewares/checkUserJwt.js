const jwt = require('jsonwebtoken');

require('dotenv').config();
const checkUserJwt = (req, res, next) => {
  console.log(req.headers.authorization);
  
  if (!req.headers.authorization) {
    res.status(401).json({message: "Unauthorized: Missing JWT"});
  }

  // jwt verifie ici le req.headers.authorization est valide
  try {
    const verifiedJwt = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
    if (verifiedJwt.role === 'ROLE_USER') {
      // console.log(verifiedJwt)
      return next();      
    }  else {
      return res.status(401).json();
    }

  } catch (err) {
    return res.status(401).json({message: "Unauthorized: Invalid Role"});
  }
  
};


module.exports = checkUserJwt;