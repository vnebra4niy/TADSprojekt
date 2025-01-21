const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = async (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next();
    }

    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: 'Auth error: No token provided' });
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Auth error: Invalid token format' });
        }

        const decoded = await new Promise((resolve, reject) => {
            jwt.verify(token, config.get('secretKey'), (err, decoded) => {
                if (err) reject(err);
                resolve(decoded);
            });
        });

        req.user = decoded;
        next();
    } catch (e) {
        console.error('JWT Auth Error:', e.message);
        return res.status(401).json({ message: 'Auth error: Invalid token' });
    }
};