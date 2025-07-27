const User = require('../models/User')

module.exports = {
    //Mostrar usuário;
    async show(req, res){
        const { user_id } = req.params;

        const user = await User.findByPk(user_id);

        if(!user) {
            return res.status(400).json({ error: 'Usuário não achado' });
        }

        return res.json(user);
    },

    //Atualiza informações do usuário;
    async update(req, res){
        const { userId } = req;
        const { name, email, username, password } = req.body;

        console.log(userId)
        const user = await User.findByPk(userId);

        if(!user) {
            return res.status(400).json({ error: 'Usuário não achado' });
        }

        Object.assign(user, { name, email, username, password_sent: password } );

        await user.save();

        return res.json(user);
    },

    //Deletando usuário;
    async erase(req, res){
        const { userId } = req;

        const user = await User.findByPk(userId);

        if(!user) {
            return res.status(400).json({ error: 'Usuário não achado' });
        }

        await user.destroy();

        return res.status(204).send();
    },
}