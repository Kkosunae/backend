'use strict';

import express from 'express';
import mapController from '../../controllers/map/index.js';
import config from 'config';
import passport from 'passport';
import footprint from './footprint.js';


const router = express.Router();

router.use('/footprint', footprint);
router.post('/', mapController.getPlacesAndFootprintsInfo);

export default router;
