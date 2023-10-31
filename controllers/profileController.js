exports.profile = (req, res) => {
    if (req.session.user) {
        res.render('profile/profile_user', {
            name: req.session.user.name, 
            items: 0,
        });
    } else {
        res.redirect('/auth/login')
    }
};