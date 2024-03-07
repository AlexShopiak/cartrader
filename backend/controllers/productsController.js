'use strict';

import { Product } from '../models/product.js';

const controller = {};

controller.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        const owners = await Product.distinct('owner');
        const data = { products, owners };

        res.status(200).send(data);

    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
};

controller.getProductsBy = async (req, res) => {
    const owner = req.query.owner;
    const name = req.query.name;
    const sort = req.query.sort;

    if (!sort && !owner && !name) {
        res.redirect('/products');
    } else {
        try {
            const prev = { sort, owner, name };
            const owners = await Product.distinct('owner');
            const products = await Product.find(getParams(owner, name));
            const data = { owners, prev };

            if (products.length === 0) {
                data.products = [];
            } else {
                data.products = sortProducts(sort, products);
            }

            res.status(200).send(data);
        } catch (err) {
            console.error(err);
            res.status(500).send(err);
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

export default controller;
