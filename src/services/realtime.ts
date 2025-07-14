import { Server as SocketIOServer } from 'socket.io';
import { Server as HTTPServer } from 'http';
import { SocialMediaAggregator } from './social-media';
import { OpenAIService } from './openai';

export interface RealTimeUpdate {
  type: 'engagement' | 'analytics' | 'ai_insight' | 'alert';
  data: any;
  timestamp: string;
  userId?: string;
}

export interface EngagementUpdate {
  postId: string;
  platform: string;
  likes: number;
  shares: number;
  comments: number;
  views?: number;
  reach?: number;
  engagement_rate: number;
}

export interface AnalyticsUpdate {
  total_engagement: number;
  total_reach: number;
  total_impressions: number;
  engagement_rate: number;
  platform_breakdown: Record<string, number>;
}

export class RealTimeService {
  private static io: SocketIOServer;
  private static updateInterval: NodeJS.Timeout | null = null;
  private static connectedUsers = new Map<string, string>(); // socketId -> userId

  /**
   * Initialize WebSocket server
   */
  static initialize(server: HTTPServer) {
    this.io = new SocketIOServer(server, {
      cors: {
        origin: process.env.NEXTAUTH_URL || "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true,
      },
    });

    this.setupEventHandlers();
    this.startRealTimeUpdates();
  }

  /**
   * Setup WebSocket event handlers
   */
  private static setupEventHandlers() {
    this.io.on('connection', (socket) => {
      console.log(`Client connected: ${socket.id}`);

      // Handle user authentication
      socket.on('authenticate', (userId: string) => {
        this.connectedUsers.set(socket.id, userId);
        socket.join(`user:${userId}`);
        console.log(`User ${userId} authenticated`);
      });

      // Handle dashboard subscription
      socket.on('subscribe_dashboard', (data: { userId: string; platforms: string[] }) => {
        socket.join(`dashboard:${data.userId}`);
        socket.join(`analytics:${data.userId}`);
        
        // Join platform-specific rooms
        data.platforms.forEach(platform => {
          socket.join(`${platform}:${data.userId}`);
        });
      });

      // Handle content analysis requests
      socket.on('analyze_content', async (data: { content: string; platform: string; userId: string }) => {
        try {
          const analysis = await OpenAIService.analyzeContent(data.content, data.platform);
          
          socket.emit('content_analysis', {
            type: 'ai_insight',
            data: analysis,
            timestamp: new Date().toISOString(),
          });
        } catch (error) {
          socket.emit('error', { message: 'Failed to analyze content' });
        }
      });

      // Handle real-time engagement tracking
      socket.on('track_engagement', (data: { postIds: string[]; userId: string }) => {
        socket.join(`engagement:${data.userId}`);
        
        // Start tracking these posts
        this.trackPostEngagement(data.postIds, data.userId);
      });

      // Handle disconnect
      socket.on('disconnect', () => {
        this.connectedUsers.delete(socket.id);
        console.log(`Client disconnected: ${socket.id}`);
      });
    });
  }

  /**
   * Start real-time updates
   */
  private static startRealTimeUpdates() {
    this.updateInterval = setInterval(async () => {
      await this.broadcastAnalyticsUpdates();
      await this.broadcastEngagementUpdates();
    }, 30000); // Update every 30 seconds
  }

  /**
   * Broadcast analytics updates to all connected users
   */
  private static async broadcastAnalyticsUpdates() {
    try {
      // Get analytics data for each connected user
      for (const [socketId, userId] of this.connectedUsers) {
        const analytics = await this.generateAnalyticsUpdate(userId);
        
        this.io.to(`analytics:${userId}`).emit('analytics_update', {
          type: 'analytics',
          data: analytics,
          timestamp: new Date().toISOString(),
        });
      }
    } catch (error) {
      console.error('Error broadcasting analytics updates:', error);
    }
  }

  /**
   * Broadcast engagement updates
   */
  private static async broadcastEngagementUpdates() {
    try {
      // Get real-time engagement data
      const engagementData = await this.generateEngagementUpdates();
      
      for (const [socketId, userId] of this.connectedUsers) {
        this.io.to(`engagement:${userId}`).emit('engagement_update', {
          type: 'engagement',
          data: engagementData,
          timestamp: new Date().toISOString(),
        });
      }
    } catch (error) {
      console.error('Error broadcasting engagement updates:', error);
    }
  }

  /**
   * Generate analytics update for a user
   */
  private static async generateAnalyticsUpdate(userId: string): Promise<AnalyticsUpdate> {
    // In a real app, this would fetch from your database
    // For now, we'll generate mock data
    const totalEngagement = Math.floor(Math.random() * 50000) + 20000;
    const totalReach = Math.floor(Math.random() * 200000) + 100000;
    const totalImpressions = Math.floor(Math.random() * 1000000) + 500000;
    
    return {
      total_engagement: totalEngagement,
      total_reach: totalReach,
      total_impressions: totalImpressions,
      engagement_rate: (totalEngagement / totalReach) * 100,
      platform_breakdown: {
        twitter: Math.floor(Math.random() * 40) + 20,
        linkedin: Math.floor(Math.random() * 30) + 15,
        instagram: Math.floor(Math.random() * 25) + 10,
        facebook: Math.floor(Math.random() * 20) + 5,
      },
    };
  }

  /**
   * Generate engagement updates
   */
  private static async generateEngagementUpdates(): Promise<EngagementUpdate[]> {
    // Mock engagement updates
    const updates: EngagementUpdate[] = [];
    const platforms = ['twitter', 'linkedin', 'instagram', 'facebook'];
    
    for (let i = 0; i < 5; i++) {
      const likes = Math.floor(Math.random() * 1000) + 100;
      const shares = Math.floor(Math.random() * 500) + 50;
      const comments = Math.floor(Math.random() * 200) + 20;
      const views = Math.floor(Math.random() * 10000) + 1000;
      
      updates.push({
        postId: `post_${Date.now()}_${i}`,
        platform: platforms[Math.floor(Math.random() * platforms.length)],
        likes,
        shares,
        comments,
        views,
        reach: views * 0.8,
        engagement_rate: ((likes + shares + comments) / views) * 100,
      });
    }
    
    return updates;
  }

  /**
   * Track engagement for specific posts
   */
  private static async trackPostEngagement(postIds: string[], userId: string) {
    // In a real app, this would set up real-time tracking
    // For now, we'll simulate updates
    setInterval(async () => {
      const updates = await SocialMediaAggregator.getRealTimeUpdates(postIds);
      
      this.io.to(`engagement:${userId}`).emit('post_engagement_update', {
        type: 'engagement',
        data: updates,
        timestamp: new Date().toISOString(),
      });
    }, 10000); // Update every 10 seconds
  }

  /**
   * Send AI insight to a specific user
   */
  static async sendAIInsight(userId: string, insight: any) {
    this.io.to(`user:${userId}`).emit('ai_insight', {
      type: 'ai_insight',
      data: insight,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Send alert to a specific user
   */
  static sendAlert(userId: string, alert: { type: string; message: string; severity: 'info' | 'warning' | 'error' }) {
    this.io.to(`user:${userId}`).emit('alert', {
      type: 'alert',
      data: alert,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Broadcast to all users
   */
  static broadcastToAll(event: string, data: any) {
    this.io.emit(event, {
      data,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Get connected users count
   */
  static getConnectedUsersCount(): number {
    return this.connectedUsers.size;
  }

  /**
   * Stop real-time updates
   */
  static stop() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
  }
} 