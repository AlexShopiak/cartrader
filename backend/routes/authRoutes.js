'use strict';

import express from 'express';
import controller from '../controllers/authController.js';

const router = express.Router();

router.get('/login', controller.getLogin);
router.get('/signup', controller.getSignup);
router.get('/logout', controller.getLogout);

router.post('/login', controller.postLogin);
router.post('/signup', controller.postSignup);

export default router;
