const Product = require('../models/Product');

exports.profile = async (req, res) => {
    if (req.session.user) {
        try {
            const count = await Product.countDocuments({ owner: req.session.user.name })
            res.render('profile/profile_user', {
                name: req.session.user.name, 
                items: count,
            });
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    } else {
        res.redirect('/auth/login')
    }
};

exports.createItem = async (req, res) => {
    if (req.session.user) {
        try {
            await Product.create({
                name: req.body.name,
                description: req.body.description,
                owner: req.session.user.name,
                price: req.body.price,
            });
            res.redirect('/profile')
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    } else {
        res.redirect('/auth/login')
    }
};

exports.deleteItem = async (req, res) => {
    res.redirect('/auth/login'); //todo
};