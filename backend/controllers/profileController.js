'use strict';

import { Product } from '../models/product.js';

const controller = {};

controller.profile = async (req, res) => {
    if (req.session.user) {
        try {
            const name = req.query.name;
            const sort = req.query.sort;

            const data = {
                name: req.session.user.name,
                prev: { name, sort },
            };

            data.items = await Product.countDocuments({
                owner: req.session.user.name,
            });
            const params = getParams(req.session.user.name, name);
            const products = await Product.find(params);

            if (products.length === 0) {
                data.message = 'No results';
            } else {
                data.products = sortProducts(sort, products);
            }

            res.status(200).send(data);
        } catch (err) {
            console.error(err);
            res.status(500).send(err);
        }
    } else {
        res.redirect('/auth/login');
    }
};

controller.createItem = async (req, res) => {
    if (req.session.user) {
        try {
            await Product.create({
                name: req.body.name,
                description: req.body.description,
                owner: req.session.user.name,
                price: req.body.price,
            });
            res.redirect('/profile');
        } catch (err) {
            console.error(err);
            res.status(500).send(err);
        }
    } else {
        res.redirect('/auth/login');
    }
};

controller.updateItem = async (req, res) => {
    if (req.session.user) {
        try {
            const newData = {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
            };
            await Product.updateOne({ _id: req.body.id }, { $set: newData });
            res.redirect('/profile');
        } catch (err) {
            console.error(err);
            res.status(500).send(err);
        }
    } else {
        res.redirect('/auth/login');
    }
};

controller.deleteItem = async (req, res) => {
    if (req.session.user) {
        try {
            await Product.deleteOne({ _id: req.body.id });
            res.redirect('/profile');
        } catch (err) {
            console.error(err);
            res.status(500).send(err);
        }
    } else {
        res.redirect('/auth/login');
    }
};

const getParams = (owner, name) => (name ? { owner, name } : { owner });

const sortProducts = (type, products) => {
    const copy = products.slice();
    if (type === 'fromcheap') {
        copy.sort((a, b) => a.price - b.price);
    } else if (type === 'tocheap') {
        copy.sort((a, b) => b.price - a.price);
    }
    return copy;
};

export default controller;
