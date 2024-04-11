'use strict';

import express from 'express';
import controller from '../controllers/mainController.js';

const router = express.Router();

router.get('/', controller.main);

export default router;
