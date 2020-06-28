const express = require('express');
const routes = express.Router();
const { Servico, User } = require('../models');

routes.get('/', async function(req, res) {

    const usuario = req.session.user;

    const agenda = await Servico.findAll({ include: [User] });

    return res.render('seusservicos', { usuario, agenda });

});

module.exports = routes;