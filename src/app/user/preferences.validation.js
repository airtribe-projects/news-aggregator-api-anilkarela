const validatePreferences = (req, res, next) => {
    const { preferences } = req.body;
    
    if (!Array.isArray(preferences)) {
        return res.status(400).json({ message: 'Preferences must be an array' });
    }
    
    next();
};

module.exports = {
    validatePreferences
};