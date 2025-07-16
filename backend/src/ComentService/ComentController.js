const User = require('../models/User')
const Post = require('../models/Post');

module.exports = {
    //Criando nova publicação
    async isLiked(req, res){
        try {
            const { user_id } = req.params;
            console.log(user_id, 'user_id')
            const { photo, title, description, link } = req.body;

            const user = await User.findByPk(user_id);
            if(!user) {
                return res.status(400).json({ error: 'Usuário não achado' });
            }

            const post = await Post.create({
                user_id,
                photo,
                title,
                description,
                link,
                likes: 0
            });

            return res.json(post);   
        } catch (error) {
            console.log(error)
        }
    },
    async like(req, res){
        try {
            const { user_id } = req.params;
            console.log(user_id, 'user_id')
            const { photo, title, description, link } = req.body;

            const user = await User.findByPk(user_id);
            if(!user) {
                return res.status(400).json({ error: 'Usuário não achado' });
            }

            const post = await Post.create({
                user_id,
                photo,
                title,
                description,
                link,
                likes: 0
            });

            return res.json(post);   
        } catch (error) {
            console.log(error)
        }
    },
    async unlike(req, res){
        try {
            const { user_id } = req.params;
            console.log(user_id, 'user_id')
            const { photo, title, description, link } = req.body;

            const user = await User.findByPk(user_id);
            if(!user) {
                return res.status(400).json({ error: 'Usuário não achado' });
            }

            const post = await Post.create({
                user_id,
                photo,
                title,
                description,
                link,
                likes: 0
            });

            return res.json(post);   
        } catch (error) {
            console.log(error)
        }
    },
};