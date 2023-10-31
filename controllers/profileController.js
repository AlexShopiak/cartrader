exports.profile = (req, res) => {
    if (req.session.user) {
        res.render('profile/profile_user', {
            name: req.session.user.name, 
            items: 5 //stub
        });
    } else {
        res.redirect('/auth/login')
    }
};