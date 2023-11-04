'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/authController');

router.get('/login', controller.getLogin);
router.get('/signup', controller.getSignup);
router.get('/logout', controller.getLogout);

router.post('/login', controller.postLogin);
router.post('/signup', controller.postSignup);

module.exports = router;
