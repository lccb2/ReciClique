const User = require('../models/User')
const Post = require('../models/Post');

module.exports = {
    //Criando nova publicação
    async store(req, res){
        try {
            const { user_id } = req.params;
            const { photo, title, description, link, photo_2, photo_3 } = req.body;

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
                likes: 0,
                photo_2,
                photo_3
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

    //Atualiza informações do post;
    async update(req, res){
        const { post_id } = req.params;
        const { photo, title, description, link, photo_2, photo_3 } = req.body;

        const post = await User.findByPk(post_id);

        if(!post) {
            return res.status(400).json({ error: 'Post não achado' });
        }

        Object.assign(post, { photo, title, description, link, photo_2, photo_3 } );

        await post.save();

        return res.json(post);
    },

     //Listar postagens mais recentes
    async recent(req, res){
        try {
            const posts = await Post.findAll({
                order: [['created_at', 'DESC']],
            });

            console.log(posts, 'posts')

            return res.status(200).json(posts);
        } catch (error) {
            // console.error('Erro Sequelize: ', error);
            return res.status(500).json({ message: 'Erro ao listar posts' });
        }
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