const jwt = require('jsonwebtoken');

// Middleware for checking authentication status
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {
            email: decodedToken.email,
            id: decodedToken.id
        };
        next();
    } catch (error) {
        res.status(401).json({
            message: 'Authentication failed'
        });
    }
};
