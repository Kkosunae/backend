'use strict';

import express from 'express';
import mapController from '../controllers/map.js';
import config from 'config';
import passport from 'passport';
import postRouter from './map/post.js';


const router = express.Router();

router.use('/post', postRouter);
router.post('/', mapController.getPlaceInfo);

export default router;
