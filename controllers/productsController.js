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
    const sort = req.query.sort;
    const owner = req.query.owner;
    const name = req.query.name;
    if (!owner && !name) return res.redirect('/products');

    try {
        const ownersList = await Product.distinct('owner');
        let params = {};

        if (owner && !name) params = {owner:owner};
        else if (!owner && name) params = {name:name};
        else params = {name:name, owner:owner};

        let products = await Product.find(params);
        
        if (products.length == 0) {
            console.log('EMPTY')
            res.render('products/products_empty', { message: "No results", ownersList: ownersList});
        } else {
            if (sort == 'fromcheap') {
                products = products.sort((a, b) => a.price - b.price);
            } else if (sort == 'tocheap') {
                products = products.sort((a, b) => b.price - a.price);
            }
            res.render('products/products', { products: products, owners: ownersList });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};