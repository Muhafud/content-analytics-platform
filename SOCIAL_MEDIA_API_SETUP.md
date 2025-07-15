# Social Media API Setup Guide

## Overview

This guide explains how to handle social media API limitations and provides alternative approaches for your content analytics platform.

## API Limitations & Solutions

### 1. **Twitter API**
- **Requirement**: Twitter Developer Account with API v2 access
- **Limitation**: Requires approval and may have rate limits
- **Solution**: 
  - Use Twitter API v2 with Bearer Token
  - Falls back to mock data if not configured
  - Consider web scraping for public data (with proper rate limiting)

### 2. **LinkedIn API**
- **Requirement**: LinkedIn Developer Account + Company Page
- **Limitation**: Requires company verification and special permissions
- **Solution**:
  - Use LinkedIn Marketing API for company pages
  - Falls back to mock data if not configured
  - Web scraping for public company posts (respect robots.txt)

### 3. **Instagram API**
- **Requirement**: Facebook Developer Account + Instagram Business Account
- **Limitation**: Requires business verification
- **Solution**:
  - Use Instagram Basic Display API or Graph API
  - Falls back to mock data if not configured
  - Web scraping for public posts (with proper delays)

### 4. **Facebook API**
- **Requirement**: Facebook Developer Account + App Review
- **Limitation**: Requires app review for most permissions
- **Solution**:
  - Use Facebook Graph API
  - Falls back to mock data if not configured

## Current Implementation

### Mock Data Fallback
The platform now includes a robust mock data system that:

1. **Generates realistic data** when APIs are not available
2. **Maintains consistent structure** across all platforms
3. **Provides meaningful insights** for development and testing
4. **Clearly indicates** when mock data is being used

### Web Scraping Alternative
For public data, you can implement web scraping:

```typescript
// Example web scraping implementation
import puppeteer from 'puppeteer';

export class WebScrapingService {
  static async scrapePublicPosts(platform: string, username: string) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    // Respect robots.txt and add delays
    await page.goto(`https://${platform}.com/${username}`);
    await page.waitForTimeout(2000); // 2 second delay
    
    // Extract public data
    const posts = await page.evaluate(() => {
      // Implementation depends on platform structure
    });
    
    await browser.close();
    return posts;
  }
}
```

## Environment Configuration

### Required API Keys (Optional)
```env
# Twitter API v2
TWITTER_BEARER_TOKEN="your-twitter-bearer-token"

# LinkedIn Marketing API
LINKEDIN_CLIENT_ID="your-linkedin-client-id"
LINKEDIN_CLIENT_SECRET="your-linkedin-client-secret"

# Instagram Graph API
INSTAGRAM_ACCESS_TOKEN="your-instagram-access-token"

# Facebook Graph API
FACEBOOK_APP_ID="your-facebook-app-id"
FACEBOOK_APP_SECRET="your-facebook-app-secret"
```

### Feature Flags
```env
# Enable/disable features based on API availability
ENABLE_SOCIAL_MEDIA_INTEGRATION="true"
ENABLE_MOCK_DATA="true"
ENABLE_WEB_SCRAPING="false"  # Use with caution
```

## API Setup Instructions

### Twitter API Setup
1. Go to [Twitter Developer Portal](https://developer.twitter.com/)
2. Create a new app
3. Apply for Elevated access (required for v2 API)
4. Generate Bearer Token
5. Add to `.env.local`:
   ```env
   TWITTER_BEARER_TOKEN="your-bearer-token"
   ```

### LinkedIn API Setup
1. Go to [LinkedIn Developers](https://www.linkedin.com/developers/)
2. Create a new app
3. Request Marketing API access
4. Get Client ID and Secret
5. Add to `.env.local`:
   ```env
   LINKEDIN_CLIENT_ID="your-client-id"
   LINKEDIN_CLIENT_SECRET="your-client-secret"
   ```

### Instagram API Setup
1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new app
3. Add Instagram Basic Display or Graph API
4. Generate Access Token
5. Add to `.env.local`:
   ```env
   INSTAGRAM_ACCESS_TOKEN="your-access-token"
   ```

## Testing Without API Keys

### Using Mock Data
The platform automatically falls back to mock data when API keys are not configured:

```bash
# Start the development server
npm run dev

# Access the social media API
curl http://localhost:3000/api/social-media
```

### Response Example
```json
{
  "total_posts": 150,
  "total_engagement": 2500,
  "total_reach": 50000,
  "platform_metrics": [...],
  "recent_posts": [...],
  "metadata": {
    "data_sources": {
      "twitter": "Mock Data (API not configured)",
      "linkedin": "Mock Data (API not configured)",
      "instagram": "Mock Data (API not configured)"
    },
    "timestamp": "2024-01-15T10:30:00.000Z",
    "note": "Some platforms may be using mock data due to API limitations..."
  }
}
```

## Production Considerations

### Rate Limiting
- Implement proper rate limiting for all API calls
- Use exponential backoff for failed requests
- Cache responses to minimize API usage

### Data Privacy
- Only collect publicly available data
- Respect platform terms of service
- Implement proper data retention policies

### Monitoring
- Monitor API usage and costs
- Set up alerts for API failures
- Track fallback to mock data usage

## Alternative Data Sources

### 1. **RSS Feeds**
- Many platforms provide RSS feeds
- Easy to parse and integrate
- No API keys required

### 2. **Public APIs**
- Consider using third-party social media APIs
- Services like Social Blade, Brand24, etc.
- May have different rate limits and costs

### 3. **Manual Data Entry**
- Allow users to manually input engagement data
- Useful for historical data or small accounts
- Can be combined with automated data

### 4. **CSV/Excel Import**
- Allow bulk import of social media data
- Useful for historical analysis
- Can be scheduled via cron jobs

## Troubleshooting

### Common Issues

1. **API Rate Limits**
   - Implement exponential backoff
   - Use multiple API keys if available
   - Cache responses appropriately

2. **Authentication Errors**
   - Verify API keys are correct
   - Check token expiration
   - Ensure proper permissions

3. **Data Inconsistencies**
   - Compare mock vs real data structure
   - Handle missing fields gracefully
   - Log data source for debugging

### Debug Mode
Enable debug logging to see which data sources are being used:

```typescript
// In your service files
console.log('Using data source:', apiKey ? 'API' : 'Mock Data');
```

## Next Steps

1. **Start with mock data** for development and testing
2. **Apply for API access** for platforms you need
3. **Implement web scraping** for public data (with proper rate limiting)
4. **Add data validation** to ensure consistency
5. **Monitor usage** and optimize API calls

## Support

For questions about API setup or troubleshooting:
- Check platform developer documentation
- Review API rate limits and quotas
- Test with mock data first
- Implement proper error handling 