const preferencesService = require('./preferences.service');

const getPreferences = async (req, res) => {
    try {
        const user = await preferencesService.getUserById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ preferences: user.preferences });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching preferences' });
    }
};

const updatePreferences = async (req, res) => {
    try {
        const { preferences } = req.body;
        const user = await preferencesService.updateUserPreferences(req.user.email, preferences);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'Preferences updated successfully', preferences: user.preferences });
    } catch (error) {
        res.status(500).json({ message: 'Error updating preferences' });
    }
};

module.exports = {
    getPreferences,
    updatePreferences
};
