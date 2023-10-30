import express from 'express';
import user_route from './user.js';
import map_route from './map.js';
import walk_route from './walk.js';
import community_route from './community.js';

const router = express.Router();

// health_check
router.get('/health_check', (req, res) => {
  res.status(200).send('OK');
});

router.get('/test', (req, res) => {
  res.status(200).send('test');
});
router.use('/user', user_route);
router.use('/map', map_route);
router.use('/walk', walk_route);
router.use('/community', community_route);

export default router;
