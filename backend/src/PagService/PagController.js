const User = require('../models/User');
const Post = require('../models/Post');
const PostMaterial = require('../models/PostMaterial');
const Materiais = require('../models/Materiais');
const Comment = require('../models/Comment');
const PostLike = require('../models/PostLike');

module.exports = {
    //Mostra todas as publicações do usuário
    async index(req, res) {
        try {
            const { user_id } = req.params;
    
            const user = await User.findByPk(user_id);
    
            if(!user) {
                return res.status(400).json({ error: 'Usuário não achado' });
            }
    
            const posts = await Post.findAll({ 
                where: {user_id},
                include: [{
                    model: Comment,
                    as: 'comments'
                }, {
                    model: PostMaterial,
                    as: 'post_materiais',
                    attributes: ['id', 'material_id'],
                    include: [{
                        model: Materiais,
                        as: 'material',
                        attributes: ['name']
                    }]
                }, {
                    model: PostLike,
                    as: 'post_likes'
                }],
                nest: true
            });

            return res.json(posts);
        } catch (error) {
            throw error;
        }
    },
};