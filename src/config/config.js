require('dotenv').config();

module.exports = {
  server: {
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || 'development'
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '24h'
  },
  news: {
    apiKey: process.env.NEWS_API_KEY,
    cacheDuration: process.env.NEWS_CACHE_DURATION || 300000 // 5 minutes
  }
};