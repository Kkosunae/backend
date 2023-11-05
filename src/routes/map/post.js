'use strict';

import express from 'express';
import postController from '../../controllers/post.js';
import config from 'config';
import passport from 'passport';
import {mapPostUpload} from '../../../middlewares/s3Middleware.js';

const router = express.Router();

router.post('/', mapPostUpload.array('images', 1), postController.createPost);

export default router;
