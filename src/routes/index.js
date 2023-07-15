import express from 'express';
const router = express.Router();

// health_check
router.get('/health_check', (req, res) => {
    res.status(200).send('OK');
});

export default router;