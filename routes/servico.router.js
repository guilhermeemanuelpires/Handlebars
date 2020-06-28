const express = require('express');
const routes = express.Router();
const { Servico, User } = require('../models');


routes.get('/', function(req, res) {
    const usuario = req.session.user;
    return res.render('index', { usuario });
});

routes.post('/save', async function(req, res) {
    try {
        var serv = req.body;

        await Servico.create(serv);

        return res.status(200).redirect('/servicos');

    } catch (e) {
        return res.status(500).render('cadservicos', { errorMsg: 'Erro ao registrar servico: ' + e });
    }
});

routes.get('/cabelo', async function(req, res) {
    const usuario = req.session.user;
    const clientes = await getCliente(req.session.user.perfil);
    res.render('cadservicos', {
        servico: {
            titulo: 'Cabelo',
            userId: req.session.user.id,
            tipo: 'C'
        },
        usuario,
        clientes
    });
});

routes.get('/barba', async function(req, res) {
    const usuario = req.session.user;
    const clientes = await getCliente(req.session.user.perfil);
    res.render('cadservicos', {
        servico: {
            titulo: 'Barba',
            userId: req.session.user.id,
            tipo: 'B'
        },
        usuario,
        clientes
    });
});

routes.get('/cabeloebarba', async function(req, res) {
    const usuario = req.session.user;
    const clientes = await getCliente(req.session.user.perfil);
    res.render('cadservicos', {
        servico: {
            titulo: 'Cabelo e Barba',
            userId: req.session.user.id,
            tipo: 'T'
        },
        usuario,
        clientes
    });
});

routes.get('/hidratacao', async function(req, res) {
    const usuario = req.session.user;

    const clientes = await getCliente(req.session.user.perfil);

    res.render('cadservicos', {
        servico: {
            titulo: 'Hidratação',
            userId: req.session.user.id,
            tipo: 'H'
        },
        usuario,
        clientes
    });
});

async function getCliente(perfil) {
    if (perfil == '1') {
        return await User.findAll({ where: { perfil: '0' } });
    } else {
        return undefined;
    }
}

module.exports = routes;