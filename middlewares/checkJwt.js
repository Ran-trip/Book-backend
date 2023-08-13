const jwt = require("jsonwebtoken");

require("dotenv").config();

const checkJwt = (req, res, next) => {
  console.log(req.headers.authorization);

  if (!req.headers.authorization) {
    return res.status(403).json({message: "Unauthorized: Missing JWT"});
  }

  // jwt verifie ici le req.headers.authorization est valide
  try {
    const verifiedJwt = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    if (verifiedJwt.role === "ROLE_ADMIN") {
      // console.log(verifiedJwt)
      return next();
    } else {
      return res.status(403).json({message: "Unauthorized: Missing JWT"});
    }
  } catch (err) {
    return res.status(401).json({message: "Unauthorized: Invalid Token"});
  }
};

module.exports = checkJwt;
