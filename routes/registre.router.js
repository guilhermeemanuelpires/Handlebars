const express = require('express');
const routes = express.Router();
const { User } = require('../models');
const bcrypt = require('bcryptjs');

routes.get('', async(req, res) => {
    return res.status(200).render('caduser');
});

routes.post('', async(req, res) => {
    try {
        const usuario = req.body;

        // criptografar senha antes mesmo de inserir ao banco
        const salt = bcrypt.genSaltSync(10);
        usuario.password = bcrypt.hashSync(usuario.password, salt);

        const user = await User.create(usuario);

        req.session.loggedIn = true;
        req.session.user = user.get({ plain: true }); // Adiciona o objeto user puro na session

        return res.status(200).redirect('/servicos');

    } catch (e) {
        res.status(500).render('caduser', { erroMesage: 'Erro ao criar o usuário : ' + e });
    }
});


module.exports = routes;