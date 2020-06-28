const nodemailer = require('nodemailer');
const emailConfig = require('./config.mail.json');

const trasnporter = nodemailer.createTransport({
    host: emailConfig.gmail.host,
    port: emailConfig.gmail.port,
    secure: emailConfig.gmail.secure,
    auth: {
        user: emailConfig.gmail.user,
        pass: emailConfig.gmail.pass
    }
});

module.exports = function(email, msg) {
    trasnporter.sendMail({
        from: emailConfig.gmail.user,
        to: email,
        subject: "Projeto Barbearia",
        text: "Está é uma mensagem automatica do projeto barbearia.",
        html: msg
    }).then(message => {
        console.log(message);
    }).catch(err => {
        console.log(err);
    });

}