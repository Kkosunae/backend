'use strict';

import express from 'express';
import ctrl from '../controllers/user.js';

const router = express.Router();

router.post('/kakao', ctrl.loginKakao);
router.post('/google', ctrl.loginGoogle);
router.post('/join', ctrl.join);

router.post('/follow', ctrl.followingController.followUser);
router.delete('/unfollow', ctrl.followingController.unfollowUser);
// 팔로우 목록
router.get('/following/:userId', ctrl.followingController.getFollowingList);
router.get('/follower/:userId', ctrl.followingController.getFollowerList);

export default router;
