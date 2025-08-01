const User = require('../models/User');
const Post = require('../models/Post');
const PostMaterial = require('../models/PostMaterial');
const Materiais = require('../models/Materiais');

module.exports = {
    //Criando nova publicação
    async store(req, res){
        try {
            const { userId } = req;
            const { photo, title, description, link, photo_2, photo_3 } = req.body;

            const user = await User.findByPk(userId);
            if(!user) {
                return res.status(400).json({ error: 'Usuário não achado' });
            }

            const { materiais } = req.body;

            materiais.map(async material => {
                const materialExiste = await Materiais.findByPk(material);

                if (!materialExiste) {
                    return res.status(400).json({ error: "Material não achado" })
                }
            });

            const post = await Post.create({
                user_id: userId,
                photo,
                title,
                description,
                link,
                likes: 0,
                photo_2,
                photo_3
            });

            const postMateriais = materiais.map(material => {
                return {
                    post_id: post.id,
                    material_id: material
                }
            });

            await PostMaterial.bulkCreate(postMateriais);

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
        const { userId } = req;

        const post = await Post.findByPk(post_id);

        if(!post) {
            return res.status(400).json({ error: 'Publicação não achada' });
        }

        if (post.user_id !== userId) {
            return res.status(401).json({ error: 'Publicação não pertence ao usuário logado!' });
        }

        await post.destroy();

        return res.status(204).send();
    },

    //Atualiza informações do post;
    async update(req, res){
        try {    
            const { post_id } = req.params;
            const { photo, title, description, link, photo_2, photo_3, materiais } = req.body;
    
            const post = await Post.findByPk(post_id);
    
            if(!post) {
                return res.status(400).json({ error: 'Post não achado' });
            }
    
    
            for (const material of materiais) {
                const materialExiste = await Materiais.findByPk(material);
    
                if (!materialExiste) {
                    throw new Error("Material não achado")
                }
            }
    
            await PostMaterial.destroy({
                where: {
                post_id: post_id
                }
            });
    
            const postMateriais = materiais.map(material => {
                return {
                    post_id: post.id,
                    material_id: material
                }
            });
    
            await PostMaterial.bulkCreate(postMateriais);
    
            Object.assign(post, { photo, title, description, link, photo_2, photo_3 } );
    
            await post.save();
    
            return res.json(post);
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }

    },

     //Listar postagens mais recentes
    async recent(req, res){
        try {
            const posts = await Post.findAll({
                order: [['created_at', 'DESC']],
            });

            return res.status(200).json(posts);
        } catch (error) {
            // console.error('Erro Sequelize: ', error);
            return res.status(500).json({ message: 'Erro ao listar posts' });
        }
    },
};