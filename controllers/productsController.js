const Product = require('../models/Product');

getAllProducts = async (req, res) => {
    try {
        const products = await Product.find(); 
        res.render('products', { products: products });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

getProductByName = async (req, res) => {
    const name = req.query.name;
    if (!name) {
        return getAllProducts(req, res);
    }
    try {
        const product = await Product.findOne({name:name});
        if (product == null) {
            res.render('products_empty', { message: `We have no: ${name}`});
        } else {
            res.render('products', { products: [product] });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}; 

module.exports = {
    getAllProducts,
    getProductByName
}