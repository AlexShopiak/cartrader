'use strict';

import express from 'express';
import controller from '../controllers/profileController.js';

const router = express.Router();

router.get('/', controller.profile);
router.get('/find', controller.profile);

router.post('/create_item', controller.createItem);
router.post('/update_item', controller.updateItem);
router.post('/delete_item', controller.deleteItem);

export default router;
