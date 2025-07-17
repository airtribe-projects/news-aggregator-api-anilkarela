# News Aggregator API

A professional RESTful API for personalized news aggregation built with Node.js, Express.js, and MongoDB. Users can register, set preferences, and get curated news from external sources.

## 🚀 Features

- **User Authentication** - JWT-based registration and login
- **Personalized Preferences** - Set and manage news categories
- **News Aggregation** - Fetch news from external APIs
- **Secure** - input validation
- **Professional Architecture** - Service layer, middleware, centralized config

## 🛠️ Tech Stack

- **Runtime**: Node.js (>= 18.0.0)
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT + bcrypt
- **External API**: NewsAPI

## 📁 Project Structure

```
src/
├── app/
│   ├── auth/           # Authentication (login, register)
│   ├── user/           # User preferences management
│   └── news/           # News fetching and aggregation
├── config/             # Application configuration
├── database/           # Database models and config
└── middleware/         # Auth and validation middleware
```

## 🚦 Quick Start

### Prerequisites
- Node.js >= 18.0.0
- MongoDB instance
- NewsAPI key from [newsapi.org](https://newsapi.org)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd news-aggregator-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp example.env .env
   ```
   
   Update `.env` with your values:
   ```env
   MONGO_URI=mongodb://localhost:27017/news-aggregator
   JWT_SECRET=your-super-secret-jwt-key
   NEWS_API_KEY=your-newsapi-key
   PORT=3000
   NODE_ENV=development
   ```

4. **Start the server**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

5. **Health Check**
   ```bash
   curl http://localhost:3000/health
   ```

## 📚 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - User login

### User Preferences
- `GET /api/v1/user/preferences` - Get user preferences
- `PUT /api/v1/user/preferences` - Update preferences

### News
- `GET /api/v1/news` - Get news by category
- `GET /api/v1/news/preferences` - Get personalized news

### System
- `GET /health` - Health check
- `GET /` - API information

## 🔧 Usage Examples

### Register User
```bash
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

### Set Preferences
```bash
curl -X PUT http://localhost:3000/api/v1/user/preferences \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"preferences":["technology","business"]}'
```

### Get Personalized News
```bash
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  http://localhost:3000/api/v1/news/preferences
```

## 📋 Valid News Categories

- `business`
- `entertainment` 
- `general`
- `health`
- `science`
- `sports`
- `technology`

## 🧪 Testing

```bash
# Run tests
npm test

# Watch mode
npm run test:watch

# Health check
npm run health
```

## 🔒 Security Features

- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **JWT** - Stateless authentication
- **bcrypt** - Password hashing
- **Input Validation** - Request validation middleware

## 🚀 Deployment

### Environment Variables
Ensure all required environment variables are set:
- `MONGO_URI`
- `JWT_SECRET`
- `NEWS_API_KEY`
- `PORT`
- `NODE_ENV`

### Production Start
```bash
NODE_ENV=production npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

ISC License - see LICENSE file for details.

## 🆘 Support

For support, please open an issue in the repository or contact the development team.

---

**Built with ❤️ using Node.js and Express.js**