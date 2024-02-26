'use strict';

import express from 'express';
import walkController from '../controllers/walk.js';
import config from 'config';
import passport from 'passport';

const router = express.Router();

router.get('/status', walkController.walkStatus);
router.post('/start', walkController.startWalk);
router.post('/end', walkController.endWalk);
router.get('/statistics', walkController.getStatistics);

export default router;
