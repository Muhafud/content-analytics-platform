# Real Data Sources Setup Guide

This guide will help you connect real data sources to your AI Content Analytics Platform.

## 🚀 Quick Start

1. **Set up environment variables** (see below)
2. **Get API keys** for the services you want to use
3. **Test the connections** using the provided endpoints
4. **Deploy with real data** for production use

## 🔑 Environment Variables Setup

### 1. OpenAI API (Required for AI Features)

1. **Get OpenAI API Key:**
   - Go to [OpenAI Platform](https://platform.openai.com/api-keys)
   - Create a new API key
   - Copy the key

2. **Add to `.env.local`:**
   ```env
   OPENAI_API_KEY=sk-your-openai-api-key-here
   ```

3. **Test OpenAI Connection:**
   ```bash
   curl -X POST http://localhost:3000/api/content/analyze \
     -H "Content-Type: application/json" \
     -d '{"content": "This is a test post about AI and technology!", "platform": "twitter"}'
   ```

### 2. Twitter API (Optional)

1. **Get Twitter API Access:**
   - Go to [Twitter Developer Portal](https://developer.twitter.com/)
   - Create a new app
   - Get your Bearer Token

2. **Add to `.env.local`:**
   ```env
   TWITTER_BEARER_TOKEN=your-twitter-bearer-token-here
   ```

3. **Test Twitter Connection:**
   ```bash
   curl "http://localhost:3000/api/analytics?accounts={\"twitter\":\"your-twitter-username\"}"
   ```

### 3. LinkedIn API (Optional)

1. **Get LinkedIn API Access:**
   - Go to [LinkedIn Developers](https://developer.linkedin.com/)
   - Create a new app
   - Get your Access Token

2. **Add to `.env.local`:**
   ```env
   LINKEDIN_ACCESS_TOKEN=your-linkedin-access-token-here
   ```

### 4. Instagram API (Optional)

1. **Get Instagram API Access:**
   - Go to [Facebook Developers](https://developers.facebook.com/)
   - Create a new app
   - Connect Instagram Basic Display API
   - Get your Access Token

2. **Add to `.env.local`:**
   ```env
   INSTAGRAM_ACCESS_TOKEN=your-instagram-access-token-here
   ```

## 🔌 API Endpoints

### Content Analysis

**POST** `/api/content/analyze`
```json
{
  "content": "Your social media content here",
  "platform": "twitter|linkedin|instagram|facebook",
  "userId": "user123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "analysis": {
      "sentiment": "positive",
      "confidence": 0.85,
      "topics": ["AI", "Technology"],
      "keywords": ["artificial intelligence", "innovation"],
      "recommendations": ["Add more hashtags", "Post during peak hours"],
      "engagement_prediction": 75
    },
    "recommendations": [...],
    "timestamp": "2024-01-01T12:00:00Z",
    "modelVersion": "gpt-4-turbo"
  }
}
```

### Analytics with Real Data

**GET** `/api/analytics?accounts={"twitter":"username","linkedin":"org-id"}`

**Response:**
```json
{
  "success": true,
  "data": {
    "total_posts": 150,
    "total_engagement": 25000,
    "total_reach": 180000,
    "platform_metrics": [...],
    "recent_posts": [...],
    "realTimeData": true
  }
}
```

### AI Insights

**GET** `/api/ai-insights?content=Your content here&platform=twitter`

## 🌐 Real-Time Data Setup

### WebSocket Connection

The platform uses WebSockets for real-time updates. Connect to:

```javascript
import { useRealTimeData } from '@/hooks/useRealTimeData';

const { isConnected, data, analyzeContent } = useRealTimeData({
  userId: 'user123',
  platforms: ['twitter', 'linkedin', 'instagram'],
  autoConnect: true
});
```

### Real-Time Events

- `analytics_update` - Live analytics data
- `engagement_update` - Real-time engagement metrics
- `ai_insight` - AI-generated insights
- `alert` - System alerts and notifications

## 📊 Database Setup (Optional)

### 1. PostgreSQL Setup

1. **Install PostgreSQL:**
   ```bash
   # macOS
   brew install postgresql
   
   # Ubuntu
   sudo apt-get install postgresql postgresql-contrib
   
   # Windows
   # Download from https://www.postgresql.org/download/windows/
   ```

2. **Create Database:**
   ```sql
   CREATE DATABASE content_analytics;
   CREATE USER content_user WITH PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE content_analytics TO content_user;
   ```

3. **Update `.env.local`:**
   ```env
   DATABASE_URL="postgresql://content_user:your_password@localhost:5432/content_analytics"
   ```

4. **Run Migrations:**
   ```bash
   npm run db:generate
   npm run db:push
   ```

### 2. Redis Setup (Optional)

1. **Install Redis:**
   ```bash
   # macOS
   brew install redis
   
   # Ubuntu
   sudo apt-get install redis-server
   
   # Windows
   # Download from https://redis.io/download
   ```

2. **Update `.env.local`:**
   ```env
   REDIS_URL="redis://localhost:6379"
   ```

## 🧪 Testing Your Setup

### 1. Test OpenAI Integration

```bash
curl -X POST http://localhost:3000/api/content/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Excited to share our latest AI breakthrough! 🚀 #AI #Innovation #Tech",
    "platform": "twitter"
  }'
```

### 2. Test Social Media Integration

```bash
# Test with Twitter
curl "http://localhost:3000/api/analytics?accounts={\"twitter\":\"elonmusk\"}"

# Test with multiple platforms
curl "http://localhost:3000/api/analytics?accounts={\"twitter\":\"username\",\"linkedin\":\"org-id\"}"
```

### 3. Test Real-Time Updates

Open your browser console and run:

```javascript
// Connect to WebSocket
const socket = io('http://localhost:3000');

socket.on('connect', () => {
  console.log('Connected to real-time service');
  
  // Subscribe to updates
  socket.emit('subscribe_dashboard', {
    userId: 'test-user',
    platforms: ['twitter', 'linkedin']
  });
});

socket.on('analytics_update', (data) => {
  console.log('Analytics update:', data);
});
```

## 🚀 Production Deployment

### 1. Environment Variables for Production

```env
# Required
OPENAI_API_KEY=sk-your-production-key
NEXTAUTH_SECRET=your-secure-secret
NEXTAUTH_URL=https://yourdomain.com

# Optional but recommended
DATABASE_URL=postgresql://user:pass@host:5432/db
REDIS_URL=redis://host:6379
TWITTER_BEARER_TOKEN=your-twitter-token
LINKEDIN_ACCESS_TOKEN=your-linkedin-token
INSTAGRAM_ACCESS_TOKEN=your-instagram-token

# Monitoring
NEXT_TELEMETRY_DISABLED=1
```

### 2. Docker Deployment

```bash
# Build the image
docker build -t content-analytics .

# Run with environment variables
docker run -p 3000:3000 \
  -e OPENAI_API_KEY=your-key \
  -e DATABASE_URL=your-db-url \
  -e REDIS_URL=your-redis-url \
  content-analytics
```

### 3. Vercel Deployment

1. **Connect your GitHub repository to Vercel**
2. **Add environment variables in Vercel dashboard**
3. **Deploy automatically on push**

## 🔧 Troubleshooting

### Common Issues

1. **OpenAI API Errors:**
   - Check your API key is correct
   - Verify you have sufficient credits
   - Check rate limits

2. **Social Media API Errors:**
   - Verify API keys and tokens
   - Check API permissions
   - Ensure accounts are public (for Twitter)

3. **WebSocket Connection Issues:**
   - Check if the server is running
   - Verify CORS settings
   - Check firewall settings

4. **Database Connection Issues:**
   - Verify connection string
   - Check database is running
   - Ensure user permissions

### Debug Mode

Enable debug logging by adding to `.env.local`:

```env
DEBUG=*
NODE_ENV=development
```

## 📈 Monitoring and Analytics

### 1. API Usage Monitoring

Track your API usage:

```javascript
// Monitor OpenAI API calls
console.log('OpenAI API call:', {
  timestamp: new Date().toISOString(),
  model: 'gpt-4-turbo',
  tokens: response.usage?.total_tokens
});
```

### 2. Real-Time Metrics

Monitor real-time connections:

```javascript
// Get connected users count
const connectedUsers = RealTimeService.getConnectedUsersCount();
console.log('Connected users:', connectedUsers);
```

### 3. Performance Monitoring

Add performance monitoring:

```javascript
// Monitor API response times
const startTime = Date.now();
const response = await fetch('/api/analytics');
const duration = Date.now() - startTime;
console.log(`API call took ${duration}ms`);
```

## 🎯 Next Steps

1. **Set up your API keys** following the guide above
2. **Test each integration** individually
3. **Configure your social media accounts**
4. **Deploy to production** with real data
5. **Monitor performance** and usage
6. **Scale as needed** based on usage patterns

Your AI Content Analytics Platform is now ready to process real data and provide actionable insights! 