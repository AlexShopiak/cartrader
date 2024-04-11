'use strict';

import express from 'express';
import controller from '../controllers/productsController.js';

const router = express.Router();

router.get('/', controller.getAllProducts);
router.get('/find', controller.getProductsBy);

export default router;
