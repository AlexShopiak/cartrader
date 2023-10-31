exports.profile = (req, res) => {
    if (req.session.user) {
        res.render('profile_user', {msg: req.session.user.name});
    } else {
        res.render('profile_guest', {});
    }
};