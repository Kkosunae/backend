'use strict';

import express from 'express';
import userCtrl from '../controllers/user/index.js';
import followCtrl from '../controllers/user/follow.js';

const router = express.Router();

router.post('/kakao', userCtrl.loginKakao);
router.post('/google', userCtrl.loginGoogle);
router.post('/join', userCtrl.join);

// 팔로우 관련
router.post('/follow', followCtrl.followController.followUser);
router.delete('/unfollow', followCtrl.followController.unfollowUser);
router.get('/following/:userId', followCtrl.followController.getFollowingList);
router.get('/follower/:userId', followCtrl.followController.getFollowerList);

export default router;
