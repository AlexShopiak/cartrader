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

exports.getProductByName = async (req, res) => {
    const name = req.query.name;
    if (!name) {
       return res.redirect('/products');
    }
    try {
        const product = await Product.findOne({name:name});
        if (product == null) {
            res.render('products/products_empty', { message: `We have no: ${name}`});
        } else {
            res.render('products/products', { products: [product] });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};