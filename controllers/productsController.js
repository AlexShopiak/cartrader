const Product = require('../models/Product');

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find(); 
        const mockProducts = [
            { name: 'Product 1', description: 'Description 1' },
            { name: 'Product 2', description: 'Description 2' },
            { name: 'Product 3', description: 'Description 3' },
          ];
        res.render('products', { products: mockProducts });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.getProductById = async (req, res) => {
    res.status(500).send('Server Error. Not implemented');
};