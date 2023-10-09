'use strict';

import express from 'express';
import walkCtrl from '../controllers/walk.js';
import config from 'config';
import passport from 'passport';

const router = express.Router();

router.post('/start', walkCtrl.startWalk);
router.post('/end', walkCtrl.endWalk);
router.get('/statistics', walkCtrl.getStatistics);

export default router;
