const express = require('express');
const cacheService = require('../../services/cache.service');
const { authenticateToken } = require('../../middleware/auth');
const { updateNewsCache } = require('../../schedulers/updateNewsCacheCron');

const router = express.Router();

// Clear cache endpoint
router.delete('/clear', authenticateToken, (req, res) => {
    cacheService.clear();
    res.json({ message: 'Cache cleared successfully' });
});

// Manual cache refresh endpoint
router.post('/refresh', authenticateToken, async (req, res) => {
    try {
        console.log('Manual cache refresh triggered');
        await updateNewsCache();
        res.json({ message: 'Cache refreshed successfully' });
    } catch (error) {
        console.error('Manual cache refresh failed:', error.message);
        res.status(500).json({ message: 'Cache refresh failed' });
    }
});

module.exports = router;