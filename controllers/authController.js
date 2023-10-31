const express = require('express');

exports.getLogin = (req, res) => {
    res.render('auth/auth_login', {});
}; 

exports.postLogin = (req, res) => {
    if(!req.body.name || !req.body.password){
        res.status("400");
        res.send("Invalid details!");
    } else {
        if('Alex' === req.body.name && '1234' === req.body.password){
            const newUser = {name: req.body.name, password: req.body.password};
            req.session.user = newUser;
            res.redirect('/profile');
        }
    }
}; 

exports.getSignup = (req, res) => {
    res.render('auth/auth_signup', {});
};

exports.postSignup = (req, res) => {
    res.render('auth/auth_signup', {});//todo
}; 

exports.getLogout = (req, res) => {
    req.session.destroy(() => {
        console.log("user logged out.")
    });
    res.redirect('/profile');
};