const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const PostLike = require('../models/PostLike');

module.exports = {
    // criar novo comentário em um post
    async createComment(req, res) {
        try {
            const { userId } = req;
            const { post_id } = req.body;
            const { text } = req.body;

            const user = await User.findByPk(userId);
            if (!user) return res.status(400).json({ error: 'Usuário não encontrado' });

            const post = await Post.findByPk(post_id);
            if (!post) return res.status(400).json({ error: 'Post não encontrado' });

            const comment = await Comment.create({ user_id: userId, post_id, text });
            return res.status(201).json(comment);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao criar comentário', details: error.message });
        }
    },

    // listar comentários de um post
    async listComments(req, res) {
        try {
            const { post_id } = req.params;
            const comments = await Comment.findAll({
                where: { post_id },
                include: [{ model: User, as: 'user', attributes: ['id', 'name'] }],
                order: [['createdAt', 'DESC']]
            });
            return res.json(comments);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao listar comentários', details: error.message });
        }
    },

    // dar like em um post
    async like(req, res) {
        try {
            const { userId } = req;
            const { post_id } = req.body;
            // verifica se já curtiu
            const alreadyLiked = await PostLike.findOne({ where: { user_id: userId, post_id } });
            
            if (alreadyLiked) return res.status(400).json({ error: 'Já curtiu este post' });

            const like = await PostLike.create({ user_id: userId, post_id });

            // opcional: incrementar contador de likes no post
            await Post.increment('likes', { by: 1, where: { id: post_id } });
            return res.status(201).json(like);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao curtir post', details: error.message });
        }
    },

    // remover like de um post
    async unlike(req, res) {
        try {
            const { userId } = req;
            const { post_id } = req.body;

            const like = await PostLike.findOne({ where: { user_id: userId, post_id } });

            if (!like) return res.status(400).json({ error: 'Like não encontrado' });

            await like.destroy();

            // opcional: decrementar contador de likes no post
            await Post.decrement('likes', { by: 1, where: { id: post_id } });
            return res.json({ success: true });
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao remover like', details: error.message });
        }
    },

    // verificar se usuário curtiu um post
    async isLiked(req, res) {
        try {
            const { userId } = req;
            const { post_id } = req.query;

            const like = await PostLike.findOne({ where: { user_id: userId, post_id } });
            return res.json({ liked: !!like });
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao verificar like', details: error.message });
        }
    },
};
