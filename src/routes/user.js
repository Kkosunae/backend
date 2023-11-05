'use strict';

import express from 'express';
import userController from '../controllers/user/index.js';
import followController from '../controllers/user/follow.js';
import config from 'config';
import passport from 'passport';

const router = express.Router();

router.post('/kakao', userController.loginKakao);
router.post('/google', userController.loginGoogle);
// router.post('/apple', userController.loginApple);
// router.get('/apple', passport.authenticate('apple'));
// router.get('/apple', (req, res) => {
//   const configs = {
//     client_id: config.get('apple.client_id'), // This is the service ID we created.
//     redirect_uri: 'http://127.0.0.1/user/apple/callback', // As registered along with our service ID
//     response_type: 'code id_token',
//     state: 'origin:web', // Any string of your choice that you may use for some logic. It's optional and you may omit it.
//     scope: 'name email', // To tell apple we want the user name and emails fields in the response it sends us.
//     response_mode: 'form_post',
//     m: 11,
//     v: '1.5.4',
//   };
//   const queryString = Object.entries(configs).map(([key, value]) => `${key}=${encodeURIComponent(value)}`).join('&');

//   res.redirect(`https://appleid.apple.com/auth/authorize?${queryString}`);
// },
// );
// router.get('/apple/callback', userController.loginApple);
router.post('/join', userController.join);

// 팔로우 관련
router.post('/follow', followController.followUser);
router.delete('/unfollow', followController.unfollowUser);
router.get('/following/:userId', followController.getFollowingList);
router.get('/follower/:userId', followController.getFollowerList);

export default router;
