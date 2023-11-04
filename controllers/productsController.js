'use strict';

const Product = require('../models/Product');

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        const owners = await Product.distinct('owner');
        const data = { products, owners };
        res.render('products/products', data);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.getProductsBy = async (req, res) => {
    const owner = req.query.owner;
    const name = req.query.name;
    const sort = req.query.sort;

    if (!sort && !owner && !name) {
        return res.redirect('/products');
    } else {
        try {
            const prev = { sort, owner, name };
            const owners = await Product.distinct('owner');
            const products = await Product.find(getParams(owner, name));
            const data = { owners, prev };

            if (products.length === 0) {
                data.message = 'No results';
            } else {
                data.products = sortProducts(sort, products);
            }

            res.render('products/products', data);
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    }
};

const getParams = (owner, name) => {
    let params = {};

    if (owner && !name) {
        params = { owner };
    } else if (!owner && name) {
        params = { name };
    } else if (owner && name) {
        params = { name, owner };
    }

    return params;
};

const sortProducts = (type, products) => {
    const copy = products.slice();

    if (type === 'fromcheap') {
        copy.sort((a, b) => a.price - b.price);
    } else if (type === 'tocheap') {
        copy.sort((a, b) => b.price - a.price);
    }

    return copy;
};
