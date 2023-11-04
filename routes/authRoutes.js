'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/authController');

router.get('/login', controller.getLogin);
router.post('/login', controller.postLogin);

router.get('/signup', controller.getSignup);
router.post('/signup', controller.postSignup);

router.get('/logout', controller.getLogout);

module.exports = router;
