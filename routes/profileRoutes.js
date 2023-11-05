'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/profileController');

router.get('/', controller.profile);
router.get('/find', controller.profile);

router.post('/create_item', controller.createItem);
router.post('/update_item', controller.updateItem);
router.post('/delete_item', controller.deleteItem);

module.exports = router;
