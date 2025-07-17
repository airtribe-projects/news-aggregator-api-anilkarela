const userModel = require('../../database/models/users.model');

const getUserById = async (id) => {
    return await userModel.findOne({ _id: id });
};

const updateUserPreferences = async (email, preferences) => {
    return await userModel.findOneAndUpdate(
        { email },
        { preferences },
        { new: true }
    );
};

module.exports = {
    getUserById,
    updateUserPreferences
};