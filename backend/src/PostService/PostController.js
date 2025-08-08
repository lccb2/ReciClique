const User = require('../models/User');
const Post = require('../models/Post');
const PostMaterial = require('../models/PostMaterial');
const Materiais = require('../models/Materiais');
const Comment = require('../models/Comment');
const PostLike = require('../models/PostLike');
const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);
const bucketName = 'imagens';

async function uploadToSupabase(file, userId, index) {
    const fileExt = file.originalname.split('.').pop();
    const timestamp = Date.now();
    const fileName = `posts/${userId}-${timestamp}-${index}.${fileExt}`;

    const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(fileName, file.buffer, {
            contentType: file.mimetype,
        });

    if (error) {
        console.error('Erro no upload para Supabase:', error);
        return null;
    }

    const { data: signedUrlData, error: signedUrlError } = await supabase.storage
        .from(bucketName)
        .createSignedUrl(data.path, 60 * 60);

    if (signedUrlError) {
        console.error('Erro ao gerar signed URL:', signedUrlError);
        return null;
    }

    return signedUrlData.signedUrl;
}

module.exports = {
    async store(req, res) {
        try {
            const { userId } = req;
            const { title, description, link, materiais } = req.body;
            const photos = req.files;

            const user = await User.findByPk(userId);
            if (!user) return res.status(400).json({ error: 'Usuário não achado' });

            let photo = null;
            let photo_2 = null;
            let photo_3 = null;

            if (photos?.length) {
                photo = await uploadToSupabase(photos[0], userId, 1);
                photo_2 = photos[1] ? await uploadToSupabase(photos[1], userId, 2) : null;
                photo_3 = photos[2] ? await uploadToSupabase(photos[2], userId, 3) : null;
            }

            const materiaisIds = Array.isArray(materiais) ? materiais : JSON.parse(materiais);

            for (const materialId of materiaisIds) {
                const exists = await Materiais.findByPk(Number(materialId));
                if (!exists) return res.status(400).json({ error: 'Material não achado' });
            }

            const post = await Post.create({
                user_id: userId,
                photo,
                photo_2,
                photo_3,
                title,
                description,
                link,
                likes: 0,
            });

            const postMateriais = materiaisIds.map(materialId => ({
                post_id: post.id,
                material_id: materialId,
            }));

            await PostMaterial.bulkCreate(postMateriais);

            return res.json(post);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao criar publicação' });
        }
    },

    //Mostrando publicação
    async show(req, res){
        try {
            const { post_id } = req.params;

            const post = await Post.findOne({ 
                where: {id: post_id},
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
                        attributes: ['id', 'name']
                    }]
                }, {
                    model: PostLike,
                    as: 'post_likes'
                }],
                nest: true
            });

            if(!post) {
                return res.status(400).json({ error: 'Publicação não achada' });
            }

            return res.json(post);
        } catch (error) {
            console.error('Erro ao buscar publicação:', error);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    },

    async erase(req, res){
        try {
            const { post_id } = req.params;
            const { userId } = req;

            const post = await Post.findByPk(post_id);

            if(!post) {
                return res.status(400).json({ error: 'Publicação não achada' });
            }

            await PostMaterial.destroy({
                where: {
                    post_id: post_id
                }
            });

            await PostLike.destroy({
                where: {
                    post_id: post_id
                }
            });

            await Comment.destroy({
                where: {
                    post_id: post_id
                }
            });

            if (post.user_id !== userId) {
                return res.status(401).json({ error: 'Publicação não pertence ao usuário logado!' });
            }

            await post.destroy();

            return res.status(200).json({ message: 'Publicação deletada com sucesso' });
        } catch (error) {
            console.error('Erro ao deletar publicação:', error);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    },

    //Atualiza informações do post;
    async update(req, res){
        try {
            const { post_id } = req.params;
            const { userId } = req;
            const { title, description, link, materiais } = req.body;
            const photos = req.files;

            console.log(photos);

            const post = await Post.findByPk(post_id);

            if(!post) {
                return res.status(400).json({ error: 'Post não achado' });
            }

            if (post.user_id !== userId) {
                return res.status(401).json({ error: 'Post não pertence ao usuário logado!' });
            }

            let photo = null;
            let photo_2 = null;
            let photo_3 = null;

            if (photos?.length) {
                photo = await uploadToSupabase(photos[0], userId, 1);
                photo_2 = photos[1] ? await uploadToSupabase(photos[1], userId, 2) : null;
                photo_3 = photos[2] ? await uploadToSupabase(photos[2], userId, 3) : null;
            }

            const materiaisIds = Array.isArray(materiais) ? materiais : JSON.parse(materiais);

            for (const materialId of materiaisIds) {
                const materialExiste = await Materiais.findByPk(Number(materialId));

                if (!materialExiste) {
                    throw new Error("Material não achado")
                }
            }

            await PostMaterial.destroy({
                where: {
                post_id: post_id
                }
            });

            const postMateriais = materiaisIds.map(materialId => {
                return {
                    post_id: post.id,
                    material_id: materialId
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
                include: [{
                    model: User,
                    as: 'user'
                }, {
                    model: Comment,
                    as: 'comments'
                }, {
                    model: PostMaterial,
                    as: 'post_materiais',
                    attributes: ['id', 'material_id'],
                    include: [{
                        model: Materiais,
                        as: 'material',
                        attributes: ['id', 'name']
                    }]
                }, {
                    model: PostLike,
                    as: 'post_likes'
                }],
                nest: true
            });

            return res.status(200).json(posts);
        } catch (error) {
            // console.error('Erro Sequelize: ', error);
            return res.status(500).json({ message: 'Erro ao listar posts' });
        }
    },

    async userPosts(req, res){
        try {
            const { user_id } = req.params;

            const posts = await Post.findAll({
                where: { user_id },
                order: [['created_at', 'DESC']],
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
                        attributes: ['id', 'name']
                    }]
                }, {
                    model: PostLike,
                    as: 'post_likes'
                }],
                nest: true
            });

            return res.status(200).json(posts);
        } catch (error) {
            console.error('Erro ao listar posts do usuário:', error);
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }
};