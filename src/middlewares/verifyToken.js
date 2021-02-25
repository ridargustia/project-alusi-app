const jwt = require('jsonwebtoken');
const { config } = require('../config');

module.exports = function (req, res, next) {
    const token = req.header('auth-token');
    if (!token) return res.status(401).json({message: 'Access denied'});

    try {
        const verified = jwt.verify(token, config.token_secret);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({message: 'Invalid token'});
    }
}