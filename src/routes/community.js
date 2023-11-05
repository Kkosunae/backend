'use strict';

import express from 'express';
import communityController from '../controllers/community.js';
import config from 'config';
import passport from 'passport';
import {communityPostUpload} from '../../middlewares/s3Middleware.js';

const router = express.Router();

// 글 작성, 수정, 삭제는 로그인한 사용자만 가능
router.post('/post', communityPostUpload.array('images', 3), communityController.createPost);
router.get('/post', communityController.getPost);
router.get('/post/:postId', communityController.getPostDetail);
router.put('/post/:postId', communityController.updatePost);
router.delete('/post/:postId', communityController.deletePost);

router.get('/post/search', communityController.searchPost);

router.post('/post/:postId/comment', communityController.postComment);
router.delete('/post/:postId/comment', communityController.deleteComment);
// router.post('/post/:postId/like', communityController.likePost);

export default router;
