'use strict';

import express from 'express';
import ctrl from '../controllers/user.js';

const router = express.Router();

router.post('/kakao', ctrl.loginKakao);
router.post('/google', ctrl.loginGoogle);
router.post('/join', ctrl.join);


// follow
// following/:userId
router.post('/:userId', ctrl.followingController.followUser);
// /following/:userId
router.delete('/:userId', ctrl.followingController.unfollowUser);

export default router;
