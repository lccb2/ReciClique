const jwt = require('jsonwebtoken')
const User = require('../models/User')

module.exports = {
    async register(req, res){
        const { name, email, instagram, phone, password, show_email, show_phone, show_insta, greeting } = req.body;
        const photo = req.file?.filename;

        const hasUser = await User.findOne({
            where: {
                email
            }
        });

        if (hasUser) {
            return res.status(403).json({
                errors: ['Email já cadastrado!']
            });
        }

        const user = await User.create({
            name,
            email,
            instagram,
            photo,
            phone,
            password_sent: password,
            show_email,
            show_phone,
            show_insta,
            greeting
        });

        return res.json(user);
    },

    async login(req,res) {
        const { email, password } = req.body;

        if(!email || !password){
            return res.status(401).json({
                errors: ['Credenciais inválidas'],
            });
        }

        const user = await User.findOne({ where: {email} });

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

        const token = jwt.sign({ id, email}, process.env.TOKEN_SECRET, {
            expiresIn: process.env.TOKEN_EXPIRATION,
        });

        return res.json({ id, token })
    },

}
