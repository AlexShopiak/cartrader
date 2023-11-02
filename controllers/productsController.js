const Product = require('../models/Product');

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find(); 
        const owners = await Product.distinct('owner');
        res.render('products/products', { products: products, owners: owners });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.getProductsBy = async (req, res) => {
    const owner = req.query.owner;
    const name = req.query.name;
    const sort = req.query.sort;
    if (!owner && !name) {
        return res.redirect('/products');
    } else {
        try {
            const ownersList = await Product.distinct('owner');
            let products = await Product.find(getParams(owner, name));
    
            if (products.length == 0) {
                res.render('products/products_empty', { message: "No results", ownersList: ownersList});
            } else {
                products = sortProducts(sort, products);
                res.render('products/products', { products: products, owners: ownersList });
            }
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    }
};

const getParams = (owner, name) => {
    let params = {};

    if (owner && !name) {
        params = {owner:owner};
    } else if (!owner && name) {
        params = {name:name};
    } else {
        params = {name:name, owner:owner};
    }
    return params;
}

const sortProducts = (type, products) => {
    const copy = products.slice();
    if (type == 'fromcheap') {
        copy.sort((a, b) => a.price - b.price);
    } else if (type == 'tocheap') {
        copy.sort((a, b) => b.price - a.price);
    }
    return copy;
}