'use strict';

const User = require('../models/user.js');

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
            const data = { message: 'User does not exist' };
            const exist = await User.findOne({ name: req.body.name });

            if (exist) {
                data.message = 'Wrong password';
            }
            res.render('auth/auth_login', data);
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
        const exist = await User.findOne({ name: req.body.name });
        if (exist) {
            const data = { message: 'User already exists' };
            res.render('auth/auth_signup', data);
        } else {
            await User.create(req.body);
            const data = { message: 'User was created' };
            res.render('auth/auth_login', data);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.getLogout = (req, res) => {
    const name = req.session.user.name;
    req.session.destroy(() => {
        console.log(name, 'logged out');
    });
    res.redirect('/profile');
};
