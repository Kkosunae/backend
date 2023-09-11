'use strict';

import express from 'express';
import mapCtrl from '../controllers/map.js';
import config from 'config';
import passport from 'passport';
import upload from '../../middlewares/s3Middleware.js';
import validatePost from '../../middlewares/validatePost.js';

const router = express.Router();

router.post('/', mapCtrl.getPlaceInfo);

export default router;
