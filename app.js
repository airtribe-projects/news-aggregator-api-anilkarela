const express = require('express');
const config = require('./src/config/config');
const authRoutes = require('./src/app/auth/auth.routes');
const userPreferences = require('./src/app/user/preferences.route');
const newsRoutes = require('./src/app/news/news.route');
const cacheRoutes = require('./src/app/news/cache.route');

const app = express();

// Body parsing middleware
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// API routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user/preferences', userPreferences);
app.use('/api/v1/news', newsRoutes);
app.use('/api/v1/cache', cacheRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'News Aggregator API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      auth: '/api/v1/auth',
      preferences: '/api/v1/user/preferences',
      news: '/api/v1/news'
    }
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error handler:', err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal server error',
    ...(config.server.env === 'development' && { stack: err.stack })
  });
});

module.exports = app;