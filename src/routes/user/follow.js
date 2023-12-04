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

// 소셜 로그인
router.post('/kakaoLogin', (req, res) => userController.socialLogin(req, res, KAKAO));
router.post('/googleLogin', (req, res) => userController.socialLogin(req, res, GOOGLE));
router.post('/appleLogin', (req, res) => userController.socialLogin(req, res, APPLE));

// 회원가입
router.post('', userController.join);

// 팔로우 관련
router.post('/follow', followController.followUser);
router.delete('/unfollow', followController.unfollowUser);
router.get('/following/:userId', followController.getFollowingList);
router.get('/follower/:userId', followController.getFollowerList);

export default router;
