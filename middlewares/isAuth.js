module.exports = function isAuth(req, res, next) {
    if (req.session.loggedIn) {
        return next();
    }
    return res.redirect('login');
}