import express from 'express';
import userRouter from './user.js';
import mapRouter from './map.js';
import walkRouter from './walk.js';
import communityRouter from './community.js';

const router = express.Router();

// health_check
router.get('/health_check', (req, res) => {
  res.status(200).send('OK');
});

router.use('/user', userRouter);
router.use('/map', mapRouter);
router.use('/walk', walkRouter);
router.use('/community', communityRouter);

export default router;
