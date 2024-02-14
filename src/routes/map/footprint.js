'use strict';

import express from 'express';
import footprintController from '../../controllers/map/footprint.js';
import config from 'config';
import passport from 'passport';
import {footprintUpload} from '../../../middlewares/s3Middleware.js';

const router = express.Router();

const handleS3UploadError = (err, req, res, next) => {
  return res.status(400).json({error: err.message});
};

// 글 작성, 수정, 삭제는 로그인한 사용자만 가능
router.post(
    '/',
    (req, res, next) => {
      console.log('!!!!!!!!!!!!');
      // 미들웨어 적용
      footprintUpload.array('image', 1)(req, res, (err) => {
        if (err) {
          console.log(err);
          // 업로드 중 에러 발생 시, 에러 핸들링 미들웨어로 이동
          handleS3UploadError(err, req, res, next);
        } else {
        // 업로드 성공 시, 다음 미들웨어로 이동
          console.log('????????');
          next();
        }
      });
    },
    footprintController.createFootprint,
);
router.get('/', footprintController.getFootprint);

router.get('/:footprintId', footprintController.getFootprintDetail);
router.put('/:footprintId', footprintController.updateFootprint);
router.delete('/:footprintId', footprintController.deleteFootprint);

router.get('/:footprintId/comment', footprintController.getComment);
router.post('/:footprintId/comment', footprintController.postComment);
router.delete('/:footprintId/comment/:commentId', footprintController.deleteComment);

export default router;
