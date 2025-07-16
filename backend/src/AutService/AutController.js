const jwt = require('jsonwebtoken')
const User = require('../models/User')

module.exports = {
    async register(req, res){
        const { name, email, username, password } = req.body;

        const hasUser = await User.findAll({
            where: {
                username
            }
        });

        if (hasUser.length) {
            return res.status(403).json({
                errors: ['Username já existe!']
            });
        }

        const user = await User.create({ name, email, username, password_sent: password });

        return res.json(user);
    },

    async login(req,res) {
        const { username, password } = req.body;

        if(!username || !password){
            return res.status(401).json({
                errors: ['Credenciais inválidas'],
            });
        }

        const user = await User.findOne({ where: {username} });

        if(!user){
            return res.status(401).json({
                errors: ['Credenciais inválidas'],
            });
        }

        const isPasswordValid = await user.passwordIsValid(password);

        if(!isPasswordValid){
            return res.status(401).json({
                errors: ['Credenciais inválidas'],
            });
        }

        const { id } = user;

        const token = jwt.sign({ id, username}, process.env.TOKEN_SECRET, {
            expiresIn: process.env.TOKEN_EXPIRATION,
        });

        return res.json({ token })
    },

}
