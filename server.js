const mongoose = require('mongoose');
const app = require('./app');
const config = require('./src/config/config');
const dbConfig = require('./src/database/config');

const connectDB = async () => {
  try {
    if (!dbConfig.mongodb.uri) {
      throw new Error('MONGO_URI environment variable is not defined');
    }
    await mongoose.connect(dbConfig.mongodb.uri, dbConfig.mongodb.options);
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    process.exit(1);
  }
};

const startServer = async () => {
  try {
    await connectDB();
    
    const port = config.server.port;
    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
