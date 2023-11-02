const express = require('express');
const router = express.Router();
const controller = require('../controllers/productsController');

router.get('/', controller.getAllProducts);
router.get('/find', controller.getProductsBy);

module.exports = router;