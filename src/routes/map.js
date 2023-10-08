'use strict';

import express from 'express';
import mapCtrl from '../controllers/map.js';
import config from 'config';
import passport from 'passport';
import post_route from './map/post.js';


const router = express.Router();

router.use('/post', post_route);
router.post('/', mapCtrl.getPlaceInfo);

export default router;
