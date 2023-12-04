'use strict';

import express from 'express';
import footprintController from '../../controllers/map/footprint.js';
import config from 'config';
import passport from 'passport';
import {footprintUpload} from '../../../middlewares/s3Middleware.js';

const router = express.Router();

router.post('/', footprintUpload.array('image', 1), footprintController.createFootprint);

export default router;
