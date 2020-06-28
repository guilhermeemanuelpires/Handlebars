const express = require('express');
const routes = express.Router();
const _ = require('lodash');
const { User } = require('../models');

const bcrypt = require('bcryptjs');
const maeil = require('../mail/email');

routes.get('/', function(req, res) {
    return res.redirect('login');
});

routes.get('/login', function(req, res) {
    return res.render('login');
});

routes.post('/login', async function(req, res) {

    try {

        const { user, password } = req.body;

        const usuario = await User.findOne({
            where: {
                user: user
            }
        });

        if (usuario) {

            if (!bcrypt.compareSync(password, usuario.password)) {
                return res.status(404).render('login', { errorMsg: 'Senha inválida!' });
            }

            req.session.loggedIn = true;
            req.session.user = usuario.get({ plain: true }); // Adiciona o objeto user puro na session

            return res.status(200).redirect('servicos');
        }

        return res.status(400).render('login', { errorMsg: 'Usuário inválido!' });


    } catch (error) {
        return res.status(400).render('login', { errorMsg: error.message });
    }

});

//RecuperaSenha
routes.get('/recuperasenha/novasenha/:hash', async function(req, res) {

    try {
        const hash = req.params.hash;

        const usuario = await User.findOne({
            where: {
                resetToken: hash
            }
        });

        if (!usuario) {
            return res.status(400).render('novasenha', { errorMsg: "Link Inválido" });
        }

        // Valida se o token é valido
        if (String(hash) != String(usuario.resetToken)) {
            return res.status(500).render('novasenha', { errorMsg: "Código de recuperção invalido!" });
        }

        //valida se o token ainda é valido
        if (usuario.dataReset <= (new Date())) {
            return res.status(500).render('novasenha', { errorMsg: "O código de recuperação expirou!" });
        }

        return res.status(200).render('novasenha', { sucess: "código válido", hash: hash });

    } catch (error) {
        res.status(500).render('novasenha', { errorMsg: error.message });
    }
});

routes.post('/recuperasenha/novasenha/save', async function(req, res) {

    try {

        const { password, password2, hash } = req.body;

        const usuario = await User.findOne({
            where: {
                resetToken: hash
            }
        });

        if (!usuario) {
            return res.status(400).render('novasenha', { errorMsg: "Link Inválido" });
        }

        // Valida se o token é valido
        if (String(hash) != String(usuario.resetToken)) {
            return res.status(500).render('novasenha', { errorMsg: "Código de recuperção invalido!" });
        }

        //valida se o token ainda é valido
        if (usuario.dataReset <= (new Date())) {
            return res.status(500).render('novasenha', { errorMsg: "O código de recuperação expirou!" });
        }

        // Valida se as senhas conferem!
        if (password != password2) {
            res.status(400).render('novasenha', { notValid: "Senhas não conferem!" });
            return res.status(400).redirect('/recuperasenha/novasenha/' + hash);
        }

        const salt = bcrypt.genSaltSync(10);
        const newpassword = bcrypt.hashSync(password, salt);

        // insere parmatros Banco de Dados!
        await User.update({
            resetToken: '',
            password: newpassword
        }, {
            where: { id: usuario.id }
        });
        // // Fim

        return res.status(500).render('login', { sucess: "Senha Atualiza com sucesso!" });

    } catch (error) {
        res.status(500).render('novasenha', { errorMsg: error.message });
    }

});

//Solicita recuperação
routes.post('/recuperasenha/solicita', async function(req, res) {

    try {

        const email = req.body.email;

        const usuario = await User.findOne({
            where: {
                email: email
            }
        });

        if (!usuario) {
            return res.status(400).render('recuperasenha', { errorMsg: "E-mail não encontrado!" });
        }

        try {
            // criptografa token
            const salt = bcrypt.genSaltSync(10);
            var TokenReset = bcrypt.hashSync(String(Math.random()), salt);
            TokenReset = TokenReset.normalize('NFD').normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Remove acentos
                .replace(/([^\w]+|\s+)/g, '-') // Substitui espaço e outros caracteres por hífen
                .replace(/\-\-+/g, '-') // Substitui multiplos hífens por um único hífen
                .replace(/(^-+|-+$)/, '');
        } catch (error) {
            return res.status(400).render('recuperasenha', { errorMsg: 'Erro na criptografia' });
        }

        // Carrega data Solictação.
        var DataReset = new Date();
        DataReset.setHours(DataReset.getHours() + 1);

        // insere parmatros Banco de Dados!
        await User.update({
            resetToken: TokenReset,
            dataReset: DataReset
        }, {
            where: { id: usuario.id }
        });
        // // Fim

        try {
            maeil(usuario.email, "Esse é seu Link de recuperação de Senha : http://localhost:3000/recuperasenha/novasenha/" + TokenReset);
        } catch (error) {
            return res.status(400).render('recuperasenha', { errorMsg: error.message });
        }

        return res.status(200).render('recuperasenha', { sucess: "Verifique sua caixa de e-mail." });

    } catch (error) {
        return res.status(400).render('recuperasenha', { errorMsg: error.message });
    }
});

// Rota para registro de novo usuario
routes.get('/register', function(req, res) {
    return res.render('caduser');
});

// Rota para Recuperar Senha
routes.get('/recuperasenha', function(req, res) {
    return res.render('recuperasenha');
});

routes.get('/sair', function(req, res) {
    req.session.loggedIn = false;
    req.session.user = null;
    return res.redirect('/');
});

module.exports = routes;