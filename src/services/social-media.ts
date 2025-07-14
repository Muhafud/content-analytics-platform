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

export class TwitterService {
  private static baseUrl = 'https://api.twitter.com/2';
  private static bearerToken = process.env.TWITTER_BEARER_TOKEN;

  static async getTweets(username: string, count: number = 10): Promise<SocialMediaPost[]> {
    try {
      if (!this.bearerToken) {
        throw new Error('Twitter Bearer Token not configured');
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
      return [];
    }
  }

  static async getMetrics(username: string): Promise<PlatformMetrics | null> {
    try {
      if (!this.bearerToken) {
        throw new Error('Twitter Bearer Token not configured');
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
      return null;
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
        throw new Error('LinkedIn Access Token not configured');
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
      return [];
    }
  }

  private static extractHashtags(content: string): string[] {
    const hashtagRegex = /#(\w+)/g;
    const matches = content.match(hashtagRegex);
    return matches ? matches.map(tag => tag.slice(1)) : [];
  }
}

export class InstagramService {
  private static baseUrl = 'https://graph.instagram.com/v12.0';
  private static accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;

  static async getPosts(userId: string, count: number = 10): Promise<SocialMediaPost[]> {
    try {
      if (!this.accessToken) {
        throw new Error('Instagram Access Token not configured');
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
      return [];
    }
  }

  private static extractHashtags(content: string): string[] {
    const hashtagRegex = /#(\w+)/g;
    const matches = content.match(hashtagRegex);
    return matches ? matches.map(tag => tag.slice(1)) : [];
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
      const linkedinPosts = await LinkedInService.getPosts(accounts.linkedin);
      allPosts.push(...linkedinPosts);
    }

    if (accounts.instagram) {
      const instagramPosts = await InstagramService.getPosts(accounts.instagram);
      allPosts.push(...instagramPosts);
    }

    // Calculate totals
    const totalPosts = allPosts.length;
    const totalEngagement = allPosts.reduce((sum, post) => 
      sum + post.engagement.likes + post.engagement.shares + post.engagement.comments, 0
    );
    const totalReach = allPosts.reduce((sum, post) => sum + (post.reach || 0), 0);

    return {
      total_posts: totalPosts,
      total_engagement: totalEngagement,
      total_reach: totalReach,
      platform_metrics: platformMetrics,
      recent_posts: allPosts.sort((a, b) => 
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      ).slice(0, 20),
    };
  }

  /**
   * Get real-time engagement updates
   */
  static async getRealTimeUpdates(postIds: string[]): Promise<Record<string, any>> {
    // In a real implementation, this would use WebSocket connections
    // or polling to get real-time updates from social media APIs
    const updates: Record<string, any> = {};

    for (const postId of postIds) {
      // Simulate real-time updates
      updates[postId] = {
        likes: Math.floor(Math.random() * 100),
        shares: Math.floor(Math.random() * 50),
        comments: Math.floor(Math.random() * 30),
        updated_at: new Date().toISOString(),
      };
    }

    return updates;
  }
} 