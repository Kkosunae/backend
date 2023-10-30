'use strict';

import express from 'express';
import userCtrl from '../controllers/user/index.js';
import followCtrl from '../controllers/user/follow.js';
import config from 'config';
import passport from 'passport';

const router = express.Router();

router.post('/kakao', userCtrl.loginKakao);
router.post('/google', userCtrl.loginGoogle);
router.post('/apple', userCtrl.loginApple);
router.get('/test', (req, res) => {
  res.status(200).send('test');
});
router.get('/apple/callback', (req, res) => {
  console.log(req.query);
  return res.status(200).json({message: 'apple callback'});
});
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
// router.get('/apple/callback', userCtrl.loginApple);
router.post('/join', userCtrl.join);

// 팔로우 관련
router.post('/follow', followCtrl.followController.followUser);
router.delete('/unfollow', followCtrl.followController.unfollowUser);
router.get('/following/:userId', followCtrl.followController.getFollowingList);
router.get('/follower/:userId', followCtrl.followController.getFollowerList);

export default router;
