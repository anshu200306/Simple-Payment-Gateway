const jwt = require('jsonwebtoken');
const jwtSecret = require('./jwtSecret');
const {user} = require('./db');

async function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
        return res.status(403).send("No token provided or invalid format");
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, jwtSecret);

    const finder = await user.findOne({ _id: decoded.user });
    if (!finder) {
        res.status(404).send("User not found");
    } else {
        req.userId = finder._id;
        next();
    }
}

module.exports = authMiddleware;
