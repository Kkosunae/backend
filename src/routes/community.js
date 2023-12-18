'use strict';

import express from 'express';
import communityController from '../controllers/community.js';
import config from 'config';
import passport from 'passport';
import {communityUpload} from '../../middlewares/s3Middleware.js';

const router = express.Router();

const handleS3UploadError = (err, req, res, next) => {
  return res.status(400).json({error: err.message});
};

// 글 작성, 수정, 삭제는 로그인한 사용자만 가능
router.post(
    '/',
    (req, res, next) => {
    // 미들웨어 적용
      communityUpload.array('images', 3)(req, res, (err) => {
        if (err) {
        // 업로드 중 에러 발생 시, 에러 핸들링 미들웨어로 이동
          handleS3UploadError(err, req, res, next);
        } else {
        // 업로드 성공 시, 다음 미들웨어로 이동
          next();
        }
      });
    },
    communityController.createPost,
);
router.get('/', communityController.getPost);
router.get('/search', communityController.searchPost);

router.get('/:postId', communityController.getPostDetail);
router.put('/:postId', communityController.updatePost);
router.delete('/:postId', communityController.deletePost);

router.get('/:postId/comment', communityController.getComment);
router.post('/:postId/comment', communityController.postComment);
router.delete('/:postId/comment/:commentId', communityController.deleteComment);

export default router;
