import express from 'express';
import userRouter from './user/index.js';
import mapRouter from './map/index.js';
import walkRouter from './walk.js';
import communityRouter from './community.js';

const router = express.Router();

// health_check
router.get('/health_check', (req, res) => {
  return res.status(200).send('OK');
});

router.use('/user', userRouter);
router.use('/map', mapRouter);
router.use('/walk', walkRouter);
router.use('/community', communityRouter);

export default router;
