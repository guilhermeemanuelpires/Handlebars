//instancia a aplicação
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
var session = require('express-session');
var hbs = require('hbs')

var path = require('path');

const app = express();

require('./models');

// //Adiciona Body-Parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use(session({
    secret: 'este é um secret'
}));

app.use(function(req, res, next) {
    res.locals.session = req.session;
    next();
});


hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');
app.set('view options', {
    layout: 'layouts/default'
});

//Adiciona o arquivo de mapeamento de rotass
app.use(routes);

// Configuração da Template Engine
app.set('view engine', 'hbs');
app.set('view options', {
    layout: 'layouts/default'
});

hbs.registerHelper('data-mes-ano', function(data) {
    data = new Date(data);
    const dia = data.getDate();
    const mes = data.getMonth() + 1;
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
});

hbs.registerHelper('formata-servico', function(servico) {
    switch (servico) {
        case 'C':
            return 'Cabelo';
        case 'B':
            return 'Barba';
        case 'T':
            return 'Cabelo e Barba';
        case 'H':
            return 'Hidratação'
        default:
            return 'Serviço não reconhecido';
    }
});

hbs.registerHelper("isMaster", function(valor) {
    if (valor == '1') {
        return true;
    } else {
        return false;
    }
});

app.use(express.static(path.join(__dirname, 'public')));

const appServer = app.listen(3000, () => {
    console.log('Aplicação está rodando na porta %s', appServer.address().port);
});