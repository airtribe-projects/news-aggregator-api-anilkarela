const { VALID_NEWS_CATEGORIES } = require('../../config/constants');

const validateCategory = (req, res, next) => {
    const { category } = req.query;
    
    if (category && !VALID_NEWS_CATEGORIES.includes(category)) {
        return res.status(400).json({ message: 'Invalid category' });
    }
    
    next();
};

module.exports = {
    validateCategory
};