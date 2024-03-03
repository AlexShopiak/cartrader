'use strict';

import { User } from '../models/user.js';

const controller = {};

controller.getLogin = (req, res) => {
    const data = {
        actionLink: '/auth/login',
        labelText: 'Log in to your account',
        buttonText: 'Log in',
        redirectLink: '/auth/signup',
        redirectText: 'Sign Up',
    };
    res.status(200).send(data);
};

controller.postLogin = async (req, res) => {
    try {
        const valid = await User.findOne(req.body);

        if (valid) {
            req.session.user = req.body;
            res.redirect('/profile');
        } else {
            const data = {
                actionLink: '/auth/login',
                labelText: 'Log in to your account',
                buttonText: 'Log in',
                redirectLink: '/auth/signup',
                redirectText: 'Sign Up',
                message: 'User does not exist',
            };

            const exist = await User.findOne({ name: req.body.name });
            if (exist) data.message = 'Wrong password';

            res.status(200).send(data);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
};

controller.getSignup = (req, res) => {
    const data = {
        actionLink: '/auth/signup',
        labelText: 'Create your account',
        buttonText: 'Sign up',
        redirectLink: '/auth/login',
        redirectText: 'Log in',
    };
    res.status(200).send(data);
};

controller.postSignup = async (req, res) => {
    try {
        let data;

        const signupData = {
            actionLink: '/auth/signup',
            labelText: 'Create your account',
            buttonText: 'Sign up',
            redirectLink: '/auth/login',
            redirectText: 'Log in',
            message: 'User already exists',
        };

        const loginData = {
            actionLink: '/auth/login',
            labelText: 'Log in to your account',
            buttonText: 'Log in',
            redirectLink: '/auth/signup',
            redirectText: 'Sign Up',
            message: 'User was created',
        };

        const exist = await User.findOne({ name: req.body.name });
        if (exist) {
            data = signupData;
        } else {
            await User.create(req.body);
            data = loginData;
        }

        res.status(200).send(data);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
};

controller.getLogout = (req, res) => {
    const name = req.session.user.name;
    req.session.destroy(() => {
        console.log(name, 'logged out');
    });
    res.redirect('/profile');
};

export default controller;
