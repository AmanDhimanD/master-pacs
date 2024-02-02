// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    try {
        const authHeader = req.header('Authorization');
        // Split the 'Bearer ' prefix from the token
        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'Access denied. Missing token.' });
        }

        jwt.verify(token, 'demo', (err, user) => {
            if (err) {
                return res.status(403).json({ error: 'Invalid token.' });
            }

            req.user = user;
            next();
        });
    }
    catch (err) {
        res.send({err : "No Access Token"})
    }
}

module.exports = authenticateToken;
