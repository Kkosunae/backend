'use strict';

import express from 'express';
import userController from '../../controllers/user/index.js';
import followController from '../../controllers/user/follow.js';
import config from 'config';
import passport from 'passport';

const KAKAO = 'KAKAO';
const GOOGLE = 'GOOGLE';
const APPLE = 'APPLE';

const router = express.Router();

// 팔로우 관련
router.post('/', followController.followUser);
router.delete('/', followController.unfollowUser);
router.get('/following/:userId', followController.getFollowingList);
router.get('/follower/:userId', followController.getFollowerList);

export default router;
