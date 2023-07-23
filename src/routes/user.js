'use strict';

import express from 'express';
import ctrl from '../controllers/user.js';

const router = express.Router();

router.post('/kakao', ctrl.loginKakao);
router.post('/google', ctrl.loginGoogle);

export default router;
