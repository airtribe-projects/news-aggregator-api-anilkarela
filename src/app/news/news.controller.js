const newsService = require('./news.service');
const preferencesService = require('../user/preferences.service');

const getNews = async (req, res) => {
    try {
        const { category = 'general' } = req.query;
        const articles = await newsService.fetchNews(category);
        res.json({ articles });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching news' });
    }
};

const getNewsByPreferences = async (req, res) => {
    try {
        const user = await preferencesService.getUserById(req.user.id);
        if (!user || !user.preferences?.length) {
            return res.status(400).json({ message: 'No preferences set' });
        }
        const articles = await newsService.fetchNewsByPreferences(user.preferences);
        res.json({ articles });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching personalized news' });
    }
};

module.exports = {
  getNews,
  getNewsByPreferences,
};
