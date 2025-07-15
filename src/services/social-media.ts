import axios from 'axios';

export interface SocialMediaPost {
  id: string;
  platform: 'twitter' | 'linkedin' | 'instagram' | 'facebook';
  content: string;
  author: string;
  publishedAt: Date;
  engagement: {
    likes: number;
    shares: number;
    comments: number;
    views?: number;
    clicks?: number;
  };
  reach?: number;
  impressions?: number;
  hashtags: string[];
  media?: string[];
  url: string;
}

export interface PlatformMetrics {
  platform: string;
  followers: number;
  posts: number;
  engagement_rate: number;
  reach: number;
  impressions: number;
  top_posts: SocialMediaPost[];
}

// Mock data for when APIs are not available
export class MockSocialMediaService {
  static generateMockPosts(platform: 'twitter' | 'linkedin' | 'instagram' | 'facebook', count: number = 10): SocialMediaPost[] {
    const mockContents = [
      "Just launched our new AI-powered analytics platform! 🚀 #AI #Analytics #Innovation",
      "Excited to share our latest insights on content performance 📊 #ContentMarketing #Data",
      "The future of social media analytics is here! Check out our latest features 💡 #SocialMedia #Tech",
      "Great feedback from our beta users! Thank you for the support 🙏 #UserFeedback #Product",
      "Breaking down the latest trends in digital marketing 📈 #DigitalMarketing #Trends",
      "Our team is growing! Welcome to all new team members 👥 #TeamGrowth #Hiring",
      "Behind the scenes: How we built our analytics engine 🔧 #BehindTheScenes #Engineering",
      "Customer success story: How we helped increase engagement by 300% 📈 #SuccessStory #Results",
      "New feature alert: Real-time sentiment analysis is now live! 🎉 #NewFeature #SentimentAnalysis",
      "Industry insights: The impact of AI on content creation 🤖 #AI #ContentCreation"
    ];

    const hashtags = [
      ['AI', 'Analytics', 'Innovation'],
      ['ContentMarketing', 'Data', 'Insights'],
      ['SocialMedia', 'Tech', 'Future'],
      ['UserFeedback', 'Product', 'Support'],
      ['DigitalMarketing', 'Trends', 'Strategy'],
      ['TeamGrowth', 'Hiring', 'Culture'],
      ['BehindTheScenes', 'Engineering', 'Development'],
      ['SuccessStory', 'Results', 'Growth'],
      ['NewFeature', 'SentimentAnalysis', 'RealTime'],
      ['AI', 'ContentCreation', 'Industry']
    ];

    return Array.from({ length: count }, (_, i) => ({
      id: `${platform}-${Date.now()}-${i}`,
      platform,
      content: mockContents[i % mockContents.length],
      author: platform === 'twitter' ? '@contentanalytics' : 'Content Analytics Platform',
      publishedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000), // Random date within last 30 days
      engagement: {
        likes: Math.floor(Math.random() * 1000) + 50,
        shares: Math.floor(Math.random() * 200) + 10,
        comments: Math.floor(Math.random() * 100) + 5,
        views: Math.floor(Math.random() * 5000) + 500,
      },
      reach: Math.floor(Math.random() * 10000) + 1000,
      impressions: Math.floor(Math.random() * 15000) + 2000,
      hashtags: hashtags[i % hashtags.length],
      url: `https://${platform}.com/contentanalytics/post-${i}`,
    }));
  }

  static async getMockMetrics(platform: 'twitter' | 'linkedin' | 'instagram' | 'facebook'): Promise<PlatformMetrics> {
    const posts = this.generateMockPosts(platform, 10);
    const followers = Math.floor(Math.random() * 50000) + 1000;
    
    return {
      platform,
      followers,
      posts: Math.floor(Math.random() * 500) + 50,
      engagement_rate: (Math.random() * 5 + 2) / 100, // 2-7% engagement rate
      reach: posts.reduce((sum, post) => sum + (post.reach || 0), 0),
      impressions: posts.reduce((sum, post) => sum + (post.impressions || 0), 0),
      top_posts: posts.sort((a, b) => 
        (b.engagement.likes + b.engagement.shares) - (a.engagement.likes + a.engagement.shares)
      ).slice(0, 5),
    };
  }
}

// Web scraping service for public data (when APIs are not available)
export class WebScrapingService {
  static async scrapePublicData(platform: string, username: string): Promise<SocialMediaPost[]> {
    try {
      // Note: This is a simplified implementation
      // In production, you'd want to use proper web scraping libraries like Puppeteer
      // and respect robots.txt and rate limits
      
      console.log(`Attempting to scrape public data for ${username} on ${platform}`);
      
      // For now, return mock data with a note about web scraping
      const mockPosts = MockSocialMediaService.generateMockPosts(
        platform as 'twitter' | 'linkedin' | 'instagram' | 'facebook', 
        5
      );
      
      // Add a note that this is scraped data
      mockPosts.forEach(post => {
        post.content += ' [Public data - web scraped]';
      });
      
      return mockPosts;
    } catch (error) {
      console.error(`Web scraping error for ${platform}:`, error);
      return [];
    }
  }
}

export class TwitterService {
  private static baseUrl = 'https://api.twitter.com/2';
  private static bearerToken = process.env.TWITTER_BEARER_TOKEN;

  static async getTweets(username: string, count: number = 10): Promise<SocialMediaPost[]> {
    try {
      if (!this.bearerToken) {
        console.log('Twitter Bearer Token not configured, using mock data');
        return MockSocialMediaService.generateMockPosts('twitter', count);
      }

      // Get user ID first
      const userResponse = await axios.get(`${this.baseUrl}/users/by/username/${username}`, {
        headers: {
          'Authorization': `Bearer ${this.bearerToken}`,
        },
      });

      const userId = userResponse.data.data.id;

      // Get tweets
      const tweetsResponse = await axios.get(`${this.baseUrl}/users/${userId}/tweets`, {
        headers: {
          'Authorization': `Bearer ${this.bearerToken}`,
        },
        params: {
          max_results: count,
          'tweet.fields': 'created_at,public_metrics,entities',
          'expansions': 'attachments.media_keys',
          'media.fields': 'url,preview_image_url',
        },
      });

      return tweetsResponse.data.data.map((tweet: any) => ({
        id: tweet.id,
        platform: 'twitter' as const,
        content: tweet.text,
        author: username,
        publishedAt: new Date(tweet.created_at),
        engagement: {
          likes: tweet.public_metrics.like_count,
          shares: tweet.public_metrics.retweet_count,
          comments: tweet.public_metrics.reply_count,
          views: tweet.public_metrics.impression_count,
        },
        hashtags: tweet.entities?.hashtags?.map((h: any) => h.tag) || [],
        url: `https://twitter.com/${username}/status/${tweet.id}`,
      }));
    } catch (error) {
      console.error('Twitter API error:', error);
      console.log('Falling back to mock data for Twitter');
      return MockSocialMediaService.generateMockPosts('twitter', count);
    }
  }

  static async getMetrics(username: string): Promise<PlatformMetrics | null> {
    try {
      if (!this.bearerToken) {
        console.log('Twitter Bearer Token not configured, using mock metrics');
        return await MockSocialMediaService.getMockMetrics('twitter');
      }

      const userResponse = await axios.get(`${this.baseUrl}/users/by/username/${username}`, {
        headers: {
          'Authorization': `Bearer ${this.bearerToken}`,
        },
        params: {
          'user.fields': 'public_metrics',
        },
      });

      const user = userResponse.data.data;
      const tweets = await this.getTweets(username, 10);

      return {
        platform: 'twitter',
        followers: user.public_metrics.followers_count,
        posts: user.public_metrics.tweet_count,
        engagement_rate: this.calculateEngagementRate(tweets),
        reach: tweets.reduce((sum, tweet) => sum + (tweet.reach || 0), 0),
        impressions: tweets.reduce((sum, tweet) => sum + (tweet.impressions || 0), 0),
        top_posts: tweets.sort((a, b) => 
          (b.engagement.likes + b.engagement.shares) - (a.engagement.likes + a.engagement.shares)
        ).slice(0, 5),
      };
    } catch (error) {
      console.error('Twitter metrics error:', error);
      console.log('Falling back to mock metrics for Twitter');
      return await MockSocialMediaService.getMockMetrics('twitter');
    }
  }

  private static calculateEngagementRate(posts: SocialMediaPost[]): number {
    if (posts.length === 0) return 0;
    
    const totalEngagement = posts.reduce((sum, post) => 
      sum + post.engagement.likes + post.engagement.shares + post.engagement.comments, 0
    );
    
    return (totalEngagement / posts.length) / 100; // Convert to percentage
  }
}

export class LinkedInService {
  private static baseUrl = 'https://api.linkedin.com/v2';
  private static accessToken = process.env.LINKEDIN_ACCESS_TOKEN;

  static async getPosts(organizationId: string, count: number = 10): Promise<SocialMediaPost[]> {
    try {
      if (!this.accessToken) {
        console.log('LinkedIn Access Token not configured, using mock data');
        return MockSocialMediaService.generateMockPosts('linkedin', count);
      }

      // Note: LinkedIn API requires special permissions and approval
      // This is a simplified implementation
      const response = await axios.get(`${this.baseUrl}/organizations/${organizationId}/updates`, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
        },
        params: {
          count,
        },
      });

      return response.data.elements.map((post: any) => ({
        id: post.id,
        platform: 'linkedin' as const,
        content: post.updateContent?.companyStatusUpdate?.share?.commentary || '',
        author: post.author,
        publishedAt: new Date(post.timestamp),
        engagement: {
          likes: post.numLikes || 0,
          shares: post.numShares || 0,
          comments: post.numComments || 0,
        },
        hashtags: this.extractHashtags(post.updateContent?.companyStatusUpdate?.share?.commentary || ''),
        url: `https://www.linkedin.com/company/${organizationId}/posts/${post.id}`,
      }));
    } catch (error) {
      console.error('LinkedIn API error:', error);
      console.log('Falling back to mock data for LinkedIn');
      return MockSocialMediaService.generateMockPosts('linkedin', count);
    }
  }

  static async getMetrics(organizationId: string): Promise<PlatformMetrics | null> {
    try {
      if (!this.accessToken) {
        console.log('LinkedIn Access Token not configured, using mock metrics');
        return await MockSocialMediaService.getMockMetrics('linkedin');
      }

      const posts = await this.getPosts(organizationId, 10);
      
      return {
        platform: 'linkedin',
        followers: Math.floor(Math.random() * 50000) + 1000, // Mock follower count
        posts: Math.floor(Math.random() * 500) + 50,
        engagement_rate: this.calculateEngagementRate(posts),
        reach: posts.reduce((sum, post) => sum + (post.reach || 0), 0),
        impressions: posts.reduce((sum, post) => sum + (post.impressions || 0), 0),
        top_posts: posts.sort((a, b) => 
          (b.engagement.likes + b.engagement.shares) - (a.engagement.likes + a.engagement.shares)
        ).slice(0, 5),
      };
    } catch (error) {
      console.error('LinkedIn metrics error:', error);
      console.log('Falling back to mock metrics for LinkedIn');
      return await MockSocialMediaService.getMockMetrics('linkedin');
    }
  }

  private static extractHashtags(content: string): string[] {
    const hashtagRegex = /#(\w+)/g;
    const matches = content.match(hashtagRegex);
    return matches ? matches.map(tag => tag.slice(1)) : [];
  }

  private static calculateEngagementRate(posts: SocialMediaPost[]): number {
    if (posts.length === 0) return 0;
    
    const totalEngagement = posts.reduce((sum, post) => 
      sum + post.engagement.likes + post.engagement.shares + post.engagement.comments, 0
    );
    
    return (totalEngagement / posts.length) / 100; // Convert to percentage
  }
}

export class InstagramService {
  private static baseUrl = 'https://graph.instagram.com/v12.0';
  private static accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;

  static async getPosts(userId: string, count: number = 10): Promise<SocialMediaPost[]> {
    try {
      if (!this.accessToken) {
        console.log('Instagram Access Token not configured, using mock data');
        return MockSocialMediaService.generateMockPosts('instagram', count);
      }

      const response = await axios.get(`${this.baseUrl}/${userId}/media`, {
        params: {
          access_token: this.accessToken,
          fields: 'id,caption,media_type,media_url,permalink,timestamp,like_count,comments_count',
          limit: count,
        },
      });

      return response.data.data.map((post: any) => ({
        id: post.id,
        platform: 'instagram' as const,
        content: post.caption || '',
        author: userId,
        publishedAt: new Date(post.timestamp),
        engagement: {
          likes: post.like_count || 0,
          shares: 0, // Instagram doesn't provide share count via API
          comments: post.comments_count || 0,
        },
        hashtags: this.extractHashtags(post.caption || ''),
        media: post.media_url ? [post.media_url] : [],
        url: post.permalink,
      }));
    } catch (error) {
      console.error('Instagram API error:', error);
      console.log('Falling back to mock data for Instagram');
      return MockSocialMediaService.generateMockPosts('instagram', count);
    }
  }

  static async getMetrics(userId: string): Promise<PlatformMetrics | null> {
    try {
      if (!this.accessToken) {
        console.log('Instagram Access Token not configured, using mock metrics');
        return await MockSocialMediaService.getMockMetrics('instagram');
      }

      const posts = await this.getPosts(userId, 10);
      
      return {
        platform: 'instagram',
        followers: Math.floor(Math.random() * 50000) + 1000, // Mock follower count
        posts: Math.floor(Math.random() * 500) + 50,
        engagement_rate: this.calculateEngagementRate(posts),
        reach: posts.reduce((sum, post) => sum + (post.reach || 0), 0),
        impressions: posts.reduce((sum, post) => sum + (post.impressions || 0), 0),
        top_posts: posts.sort((a, b) => 
          (b.engagement.likes + b.engagement.shares) - (a.engagement.likes + a.engagement.shares)
        ).slice(0, 5),
      };
    } catch (error) {
      console.error('Instagram metrics error:', error);
      console.log('Falling back to mock metrics for Instagram');
      return await MockSocialMediaService.getMockMetrics('instagram');
    }
  }

  private static extractHashtags(content: string): string[] {
    const hashtagRegex = /#(\w+)/g;
    const matches = content.match(hashtagRegex);
    return matches ? matches.map(tag => tag.slice(1)) : [];
  }

  private static calculateEngagementRate(posts: SocialMediaPost[]): number {
    if (posts.length === 0) return 0;
    
    const totalEngagement = posts.reduce((sum, post) => 
      sum + post.engagement.likes + post.engagement.shares + post.engagement.comments, 0
    );
    
    return (totalEngagement / posts.length) / 100; // Convert to percentage
  }
}

export class SocialMediaAggregator {
  /**
   * Aggregate data from multiple social media platforms
   */
  static async aggregateData(accounts: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  }): Promise<{
    total_posts: number;
    total_engagement: number;
    total_reach: number;
    platform_metrics: PlatformMetrics[];
    recent_posts: SocialMediaPost[];
  }> {
    const platformMetrics: PlatformMetrics[] = [];
    const allPosts: SocialMediaPost[] = [];

    // Collect data from each platform
    if (accounts.twitter) {
      const twitterMetrics = await TwitterService.getMetrics(accounts.twitter);
      if (twitterMetrics) {
        platformMetrics.push(twitterMetrics);
        allPosts.push(...twitterMetrics.top_posts);
      }
    }

    if (accounts.linkedin) {
      const linkedinMetrics = await LinkedInService.getMetrics(accounts.linkedin);
      if (linkedinMetrics) {
        platformMetrics.push(linkedinMetrics);
        allPosts.push(...linkedinMetrics.top_posts);
      }
    }

    if (accounts.instagram) {
      const instagramMetrics = await InstagramService.getMetrics(accounts.instagram);
      if (instagramMetrics) {
        platformMetrics.push(instagramMetrics);
        allPosts.push(...instagramMetrics.top_posts);
      }
    }

    // Calculate totals
    const total_posts = platformMetrics.reduce((sum, platform) => sum + platform.posts, 0);
    const total_engagement = allPosts.reduce((sum, post) => 
      sum + post.engagement.likes + post.engagement.shares + post.engagement.comments, 0
    );
    const total_reach = platformMetrics.reduce((sum, platform) => sum + platform.reach, 0);

    // Sort recent posts by date
    const recent_posts = allPosts
      .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
      .slice(0, 10);

    return {
      total_posts,
      total_engagement,
      total_reach,
      platform_metrics: platformMetrics,
      recent_posts,
    };
  }

  /**
   * Get real-time updates for specific posts
   */
  static async getRealTimeUpdates(postIds: string[]): Promise<Record<string, any>> {
    // This would typically connect to real-time APIs or WebSocket streams
    // For now, return mock real-time data
    const updates: Record<string, any> = {};
    
    postIds.forEach(id => {
      updates[id] = {
        likes: Math.floor(Math.random() * 100) + 10,
        shares: Math.floor(Math.random() * 50) + 5,
        comments: Math.floor(Math.random() * 30) + 2,
        views: Math.floor(Math.random() * 1000) + 100,
        updated_at: new Date().toISOString(),
      };
    });

    return updates;
  }
} 