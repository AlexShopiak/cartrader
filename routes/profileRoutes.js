const express = require('express');
const router = express.Router();
const controller = require('../controllers/profileController');

router.get('/', controller.profile);

router.post('/create_item', controller.createItem);
router.post('/delete_item', controller.deleteItem);

module.exports = router;