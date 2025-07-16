const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({
            errors: ['Login necessário!']
        });
    }

    const [, token] = authorization.split(' ');

    try {
        const dados = jwt.verify(token, process.env.TOKEN_SECRET);
        const { id, email } = dados;

        req.userId = id;
        req.userEmail = email;

        next();
    } catch (error) {
        return res.status(401).json({
            errors: ['Token expirado ou inválido!']
        });
    }
};