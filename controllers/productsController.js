const Product = require('../models/Product');

getAllProducts = async (req, res) => {
    try {
        const products = await Product.find(); 
        if (!products) {
            res.render('products', { products: [] });
        }
        res.render('products', { products: Array.isArray(products) ? products : [products] });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

getProductByName = async (req, res) => {
    const productName = req.query.name;
    if (!productName) {
        return getAllProducts(req, res);
    }
    try {
        const products = await Product.findOne({name:productName});
        if (!products) {
            return res.render('products_empty', {message: `No products with the name: ${productName}`});
        }
        console.log(products)
        res.render('products', { products: Array.isArray(products) ? products : [products] });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}; 

module.exports = {
    getAllProducts,
    getProductByName
}