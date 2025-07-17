const cron = require('node-cron');
const newsService = require('../app/news/news.service');
const { VALID_NEWS_CATEGORIES } = require('../config/constants');
const cacheService = require('../services/cache.service');

const updateNewsCache = async () => {
        console.log('🔄 Running scheduled cache update for news categories...');
        try {
            const updatePromises = VALID_NEWS_CATEGORIES.map(async (category) => {
                try {
                    // Clear existing cache for this category
                    const cacheKey = cacheService.generateKey(category);
                    cacheService.cache.delete(cacheKey);
                    
                    // Fetch fresh data
                    await newsService.fetchNews(category);
                    console.log(`Updated cache for ${category}`);
                } catch (error) {
                    console.error(`Failed to update ${category}:`, error.message);
                }
            });

            await Promise.all(updatePromises);
            console.log('Background cache update completed');
        } catch (error) {
            console.error('Background cache update failed:', error.message);
        }
    }
const updateNewsCacheCron = () => {
    cron.schedule('*/10 * * * *', updateNewsCache);
}

module.exports = {updateNewsCacheCron, updateNewsCache};