'use strict';

import express from 'express';
import communityCtrl from '../controllers/community.js';
import config from 'config';
import passport from 'passport';
import {communityPostUpload} from '../../middlewares/s3Middleware.js';

const router = express.Router();

// 글 작성, 수정, 삭제는 로그인한 사용자만 가능
router.post('/post', communityPostUpload.array('images', 3), communityCtrl.createPost);
router.get('/post', communityCtrl.getPost);
router.get('/post/:postId', communityCtrl.getPostDetail);
router.put('/post/:postId', communityCtrl.updatePost);
router.delete('/post/:postId', communityCtrl.deletePost);

router.get('/post/search', communityCtrl.searchPost);

router.post('/post/:postId/comment', communityCtrl.postComment);
router.delete('/post/:postId/comment', communityCtrl.deleteComment);
// router.post('/post/:postId/like', communityCtrl.likePost);

export default router;
