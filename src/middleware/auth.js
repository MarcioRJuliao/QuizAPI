const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).send('Token não fornecido');
    }

    jwt.verify(token, process.env.JWT_SECRET, (e, user) => {
        if (e) {
            return res.status(403).send('Token inválido');
        }

        req.user = user;
        next(); 
    });
}

module.exports = authenticateToken;