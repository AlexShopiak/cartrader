const User = require('../models/user.js')

exports.getLogin = (req, res) => {
    res.render('auth/auth_login', {});
}; 

exports.postLogin = async (req, res) => {
    try {
        const valid = await User.findOne(req.body);
        
        if (valid) {
            req.session.user = req.body;
            res.redirect('/profile');
        } else {
            const exist = await User.findOne({name: req.body.name});
            let msg = "User does not exist";
            if (exist) msg = "Wrong password";
            res.render('auth/auth_login', { msg });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}; 

exports.getSignup = (req, res) => {
    res.render('auth/auth_signup', {});
};

exports.postSignup = async (req, res) => {
    try {
        const exist = await User.findOne({name: req.body.name});
        if (!exist) {
            await User.create(req.body);
            res.render('auth/auth_login', { msg: "User was created" });
        } else {
            res.render('auth/auth_signup', { msg: "User already exists" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}; 

exports.getLogout = (req, res) => {
    req.session.destroy(() => {
        console.log("user logged out.")
    });
    res.redirect('/profile');
};