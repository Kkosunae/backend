'use strict';

import express from 'express';
import ctrl from '../controllers/user.js';

const router = express.Router();

router.get('/kakao', ctrl.loginKakao);

export default router;