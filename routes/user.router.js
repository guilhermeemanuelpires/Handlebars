const express = require('express');
const routes = express.Router();
const _ = require('lodash');
const { User } = require('../models');

routes.get('/', async(req, res) => {
    const user = await User.findByPk(req.session.user.id);
    const usuario = user;
    res.render('usuario', { usuario });
});

routes.post('/edita', async(req, res) => {

    try {
        const id = req.session.user.id;
        const dataToUpdate = req.body;
        const user = await User.findByPk(id);

        if (user) {
            _.assign(user, dataToUpdate);
            await user.save();
            return res.status(200).redirect('/usuario');
        } else {
            return res.status(404).redirect('/usuario');
        }
    } catch (error) {
        return res.status(500).redirect('/usuario');
    }
});


module.exports = routes;