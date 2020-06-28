const express = require('express');
const routes = new express.Router();
const loginRouter = require('./login.router');
const registreRouter = require('./registre.router');
const userRoute = require('./user.router');
const servicosRouter = require('./servico.router');
const agendaRouter = require('./agenda.router');
const seusServicosRouter = require('./seusservicos.router');

const isAuth = require('../middlewares/isAuth');
const isMaster = require('../middlewares/isMaster.js');

routes.use('/', loginRouter);
routes.use('/registre', registreRouter);
routes.use('/usuario', [isAuth], userRoute);
routes.use('/servicos', [isAuth], servicosRouter);
routes.use('/agenda', [isAuth], agendaRouter);
routes.use('/seuservicos', [isAuth, isMaster], seusServicosRouter);


module.exports = routes;