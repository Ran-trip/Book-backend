const jwt = require('jsonwebtoken');

require('dotenv').config();

const checkJwt = (req, res, next) => {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
        return res.status(401).json({ message: 'Authorization token missing' });
    }

    try {
        const token = authorizationHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.log('Invalid token:', err);
        return res.status(403).json({ message: 'Invalid token' });
    }
};

module.exports = checkJwt;
