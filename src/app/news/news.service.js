const axios = require('axios');
const config = require('../../config/config');
const cacheService = require('../../services/cache.service');

const fetchNews = async (category = 'general') => {
    const cacheKey = cacheService.generateKey(category);
    
    // Check cache first
    const cachedData = cacheService.get(cacheKey);
    if (cachedData) {
        return cachedData;
    }

    try {
        const response = await axios.get(`https://newsapi.org/v2/top-headlines`, {
            params: {
                category,
                country: 'us',
                apiKey: config.news.apiKey
            }
        });
        const articles = response.data.articles;
        
        // Cache the result
        cacheService.set(cacheKey, articles);
        return articles;
    } catch (error) {
        console.error(`Error fetching news for ${category}:`, error.message);
        throw new Error('Failed to fetch news');
    }
};

const fetchNewsByPreferences = async (preferences) => {
    const cacheKey = cacheService.generateKey(null, preferences);
    
    // Check cache first
    const cachedData = cacheService.get(cacheKey);
    if (cachedData) {
        return cachedData;
    }

    try {
        const newsPromises = preferences.map(category => fetchNews(category));
        const newsResults = await Promise.all(newsPromises);
        const allArticles = newsResults.flat();
        
        // Cache the result
        cacheService.set(cacheKey, allArticles);
        return allArticles;
    } catch (error) {
        console.error('Error fetching personalized news:', error.message);
        throw new Error('Failed to fetch personalized news');
    }
};

module.exports = {
    fetchNews,
    fetchNewsByPreferences
};