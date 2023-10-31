exports.profile = (req, res) => {
    if (req.session.user) {
        res.render('profile/profile_user', {msg: req.session.user.name});
    } else {
        res.render('profile/profile_guest', {});
    }
};