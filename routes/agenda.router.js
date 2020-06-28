const express = require('express');
const routes = express.Router();
const { Servico } = require('../models');

routes.get('/', async function(req, res) {
    const usuario = req.session.user;

    const agenda = await Servico.findAll({ where: { userId: usuario.id } });

    return res.render('agenda', { usuario, agenda });
});

module.exports = routes;