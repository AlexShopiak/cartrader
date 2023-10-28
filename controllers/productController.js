const Product = require('../models/Product');
const path = require('path');

exports.getAllProducts = async (req, res) => {
    /*try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).send('Ошибка при получении данных');
    }*/
    //res.send('Products page.TODO');
    res.sendFile(path.join(__dirname, '../views/products.html'));
};

exports.getProductById = async (req, res) => {
    /*try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            res.status(404).send('Продукт не найден');
        } else {
            res.json(product);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Ошибка при получении данных');
    }*/
    //res.send('Products page.TODO');
    res.sendFile(path.join(__dirname, '../views/products.html'));
};