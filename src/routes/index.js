import express from 'express';
import user_route from './user.js';
import post_route from './post.js';
import map_route from './map.js';

const router = express.Router();

// health_check
router.get('/health_check', (req, res) => {
  res.status(200).send('OK');
});

router.use('/user', user_route);
router.use('/post', post_route);
router.use('/map', map_route);

export default router;
