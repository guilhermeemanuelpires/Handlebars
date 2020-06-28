module.exports = function isMaster(req, res, next) {
    if (req.session.user.perfil == '1') {
        return next();
    }
    return res.redirect('servicos');
}