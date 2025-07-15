# AI Content Analytics Platform - Setup Guide

This guide will help you set up the AI Content Analytics Platform on your local machine.

## Prerequisites

- Node.js 18+ 
- Docker and Docker Compose (recommended)
- PostgreSQL 14+ (if not using Docker)
- Redis (if not using Docker)
- OpenAI API key

## Quick Start with Docker (Recommended)

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd ai-content-analytics
   ```

2. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Edit `.env.local` and add your OpenAI API key:
   ```env
   OPENAI_API_KEY=your-openai-api-key-here
   ```

3. **Start the application**
   ```bash
   docker-compose up -d
   ```

4. **Set up the database**
   ```bash
   docker-compose exec app npm run db:generate
   docker-compose exec app npm run db:push
   ```

5. **Access the application**
   - Main app: http://localhost:3000
   - Prisma Studio: http://localhost:5555

## Manual Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Set up Environment Variables

Copy the example environment file and configure it:

```bash
cp env.example .env.local
```

Required environment variables:
- `DATABASE_URL`: PostgreSQL connection string
- `REDIS_URL`: Redis connection string
- `NEXTAUTH_SECRET`: Random string for session encryption
- `OPENAI_API_KEY`: Your OpenAI API key

### 3. Set up Database

1. **Install PostgreSQL and Redis**
   - PostgreSQL: https://www.postgresql.org/download/
   - Redis: https://redis.io/download

2. **Create database**
   ```sql
   CREATE DATABASE content_analytics;
   ```

3. **Run database migrations**
   ```bash
   npm run db:generate
   npm run db:push
   ```

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at http://localhost:3000

## Features Overview

### Core Features

1. **Real-time Analytics Dashboard**
   - Live engagement metrics
   - Performance tracking
   - Platform distribution

2. **AI-Powered Insights**
   - Sentiment analysis
   - Content optimization recommendations
   - Predictive analytics

3. **Multi-Platform Integration**
   - Twitter, LinkedIn, Instagram
   - Unified analytics view
   - Cross-platform insights

4. **Advanced Visualizations**
   - Interactive charts with D3.js
   - Real-time data updates
   - Customizable dashboards

### 🛠 Technical Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express, Prisma ORM
- **Database**: PostgreSQL with TimescaleDB
- **Caching**: Redis
- **AI/ML**: OpenAI API, custom models
- **Real-time**: WebSockets, Socket.io
- **Deployment**: Docker, AWS ECS

## Development Workflow

### 1. Database Management

```bash
# Generate Prisma client
npm run db:generate

# Push schema changes
npm run db:push

# Open Prisma Studio
npm run db:studio
```

### 2. API Development

The application includes several API routes:

- `/api/analytics` - Analytics data
- `/api/ai-insights` - AI-powered insights
- `/api/content` - Content management
- `/api/auth/*` - Authentication

### 3. Adding New Features

1. **Create new components** in `src/components/`
2. **Add API routes** in `src/app/api/`
3. **Update database schema** in `prisma/schema.prisma`
4. **Add types** in `src/types/`

## Deployment

### Docker Deployment

```bash
# Build production image
docker build -t content-analytics .

# Run with environment variables
docker run -p 3000:3000 \
  -e DATABASE_URL=your-db-url \
  -e OPENAI_API_KEY=your-key \
  content-analytics
```

### AWS ECS Deployment

1. **Build and push to ECR**
   ```bash
   aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin your-account.dkr.ecr.us-east-1.amazonaws.com
   docker build -t content-analytics .
   docker tag content-analytics:latest your-account.dkr.ecr.us-east-1.amazonaws.com/content-analytics:latest
   docker push your-account.dkr.ecr.us-east-1.amazonaws.com/content-analytics:latest
   ```

2. **Deploy to ECS**
   - Create ECS cluster
   - Create task definition
   - Create service

## Troubleshooting

### Common Issues

1. **Database connection errors**
   - Check `DATABASE_URL` in `.env.local`
   - Ensure PostgreSQL is running
   - Verify database exists

2. **Redis connection errors**
   - Check `REDIS_URL` in `.env.local`
   - Ensure Redis is running

3. **OpenAI API errors**
   - Verify `OPENAI_API_KEY` is set
   - Check API key permissions
   - Monitor API usage limits

4. **Build errors**
   - Clear `.next` directory: `rm -rf .next`
   - Reinstall dependencies: `rm -rf node_modules && npm install`

### Performance Optimization

1. **Database indexing**
   ```sql
   CREATE INDEX idx_content_items_published_at ON content_items(published_at);
   CREATE INDEX idx_analytics_recorded_at ON analytics(recorded_at);
   ```

2. **Redis caching**
   - Cache frequently accessed data
   - Use Redis for session storage
   - Implement cache invalidation

3. **API optimization**
   - Implement pagination
   - Use database queries efficiently
   - Add request rate limiting

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Review the troubleshooting guide 