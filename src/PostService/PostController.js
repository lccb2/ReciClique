const User = require('../models/User')
const Post = require('../models/Post');

module.exports = {
    //Criando nova publicação
    async store(req, res){
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

    //Mostrando publicação
    async show(req, res){
        const { post_id } = req.params;

        const post = await Post.findByPk(post_id);

        if(!post) {
            return res.status(400).json({ error: 'Publicação não achada' });
        }

        return res.json(post);
    },

    //Deletando publicação;
    async erase(req, res){
        const { post_id } = req.params;

        const post = await Post.findByPk(post_id);

        if(!post) {
            return res.status(400).json({ error: 'Publicação não achada' });
        }

        await post.destroy();

        return res.status(204).send();
    },

    //Aumentar número de like;
    async incrementLike(req, res){
        try {
            const { post_id } = req.params;

            const post = await Post.findByPk(post_id);

            if(!post) {
            return res.status(400).json({ error: 'Publicação não achada' });
            }

            post.likes += 1;
            await post.save();
            return res.json({ message: 'Post curtido!', likes: post.likes });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao curtir o post' });
        }
    },

    //Diminuir número de likes;
    async decrementLike(req, res){
        try {
            const { post_id } = req.params;

            const post = await Post.findByPk(post_id);

            if(!post) {
            return res.status(400).json({ error: 'Publicação não achada' });
            }

            post.likes = Math.max((post.likes || 0) - 1, 0);
            await post.save();
            return res.json({ message: 'Post descurtido!', likes: post.likes });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao curtir o post' });
        }
    },
};