'use strict';

import express from 'express';
import postCtrl from '../../controllers/post.js';
import config from 'config';
import passport from 'passport';
import upload from '../../../middlewares/s3Middleware.js';

const router = express.Router();

router.post('/', upload.array('images', 3), postCtrl.createPost);
// router.post('/', postCtrl.getPost);

export default router;