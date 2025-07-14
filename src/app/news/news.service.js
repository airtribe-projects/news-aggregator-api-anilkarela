const axios = require('axios');
const config = require('../../config/config');

const fetchNews = async (category = 'general') => {
    try {
        const response = await axios.get(`https://newsapi.org/v2/top-headlines`, {
            params: {
                category,
                country: 'us',
                apiKey: config.news.apiKey
            }
        });
        return response.data.articles;
    } catch (error) {
        throw new Error('Failed to fetch news');
    }
};

const fetchNewsByPreferences = async (preferences) => {
    try {
        const newsPromises = preferences.map(category => fetchNews(category));
        const newsResults = await Promise.all(newsPromises);
        return newsResults.flat();
    } catch (error) {
        throw new Error('Failed to fetch personalized news');
    }
};

module.exports = {
    fetchNews,
    fetchNewsByPreferences
};