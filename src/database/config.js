require("dotenv").config();

const config = {
    mongodb: {
        uri: process.env.MONGO_URI,
        options: {
            maxPoolSize: 10
        }
    }
};

module.exports = config;