const Post = require('../models/Post');
const PostMaterial = require('../models/PostMaterial');
const Materiais = require('../models/Materiais');
const User = require('../models/User');

module.exports = {
    // recebe lista de material_ids e retorna posts que usam esses materiais
    async searchByMaterials(req, res) {
        try {
            const { material_ids } = req.body; // array de ids
            if (!Array.isArray(material_ids) || material_ids.length === 0) {
                return res.status(400).json({ error: 'Envie uma lista de materiais' });
            }

            // busca todos os post_ids que usam pelo menos um dos materiais
            const postMaterials = await PostMaterial.findAll({
                where: { material_id: material_ids },
                attributes: ['post_id'],
                group: ['post_id']
            });
            const postIds = postMaterials.map(pm => pm.post_id);

            // busca os posts
            const posts = await Post.findAll({
                where: { id: postIds },
                include: [
                    { model: User, as: 'user', attributes: ['id', 'name'] },
                    { model: Materiais, as: 'materiais', through: { attributes: [] } }
                ]
            });
            return res.json(posts);
        } catch (error) {
            return res.status(500).json({ error: 'Erro na pesquisa', details: error.message });
        }
    },
};
