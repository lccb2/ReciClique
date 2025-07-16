const User = require('../models/User');
const Post = require('../models/Post');

module.exports = {
    //Mostra todas as publicações do usuário
    async index(req, res){
        const { user_id } = req.params;

        const user = await User.findByPk(user_id);

        if(!user) {
            return res.status(400).json({ error: 'Usuário não achado' });
        }

        const posts = await Post.findAll({ where: {user_id} })

        return res.json(posts);

    },
};