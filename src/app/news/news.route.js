const express = require('express');
const { getNews, getNewsByPreferences } = require('./news.controller');
const { authenticateToken } = require('../../middleware/auth');
const { validateCategory } = require('./news.validation');

const router = express.Router();

router.get('/', validateCategory, getNews);
router.get('/preferences', authenticateToken, getNewsByPreferences);

module.exports = router;