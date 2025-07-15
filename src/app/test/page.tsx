'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Users, Eye, Heart, Share2, MessageCircle, RefreshCw } from 'lucide-react';

interface SocialMediaData {
  total_posts: number;
  total_engagement: number;
  total_reach: number;
  platform_metrics: any[];
  recent_posts: any[];
  metadata: {
    data_sources: Record<string, string>;
    timestamp: string;
  };
}

interface AnalyticsData {
  success: boolean;
  data: {
    overview: {
      totalEngagement: number;
      totalReach: number;
      totalImpressions: number;
      engagementRate: number;
      shares: number;
      comments: number;
    };
    performance: any[];
    platforms: any[];
  };
}

export default function TestPage() {
  const [socialMediaData, setSocialMediaData] = useState<SocialMediaData | null>(null);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch social media data
      const socialResponse = await fetch('/api/social-media');
      const socialData = await socialResponse.json();
      setSocialMediaData(socialData);

      // Fetch analytics data
      const analyticsResponse = await fetch('/api/analytics');
      const analyticsData = await analyticsResponse.json();
      setAnalyticsData(analyticsData);
    } catch (err) {
      setError('Failed to fetch data. Make sure the server is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Content Analytics Platform - Live Test
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Testing real functionality with live API calls and data processing
          </p>
          
          <button
            onClick={fetchData}
            disabled={loading}
            className="btn-primary flex items-center mx-auto"
          >
            {loading ? (
              <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
            ) : (
              <RefreshCw className="w-5 h-5 mr-2" />
            )}
            {loading ? 'Refreshing...' : 'Refresh Data'}
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Social Media Data */}
        {socialMediaData && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Social Media Analytics</h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Posts</p>
                    <p className="text-2xl font-bold text-gray-900">{socialMediaData.total_posts.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Engagement</p>
                    <p className="text-2xl font-bold text-gray-900">{socialMediaData.total_engagement.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Heart className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Reach</p>
                    <p className="text-2xl font-bold text-gray-900">{socialMediaData.total_reach.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </Card>
            </div>

            {/* Platform Metrics */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {socialMediaData.platform_metrics.map((platform, index) => (
                <Card key={index} className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 capitalize">{platform.platform}</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Followers:</span>
                      <span className="font-medium">{platform.followers.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Posts:</span>
                      <span className="font-medium">{platform.posts}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Engagement:</span>
                      <span className="font-medium">{(platform.engagement_rate * 100).toFixed(1)}%</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Data Source Info */}
            <Card className="p-4 bg-blue-50 border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-2">Data Sources</h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                {Object.entries(socialMediaData.metadata.data_sources).map(([platform, source]) => (
                  <div key={platform} className="flex justify-between">
                    <span className="text-blue-800 capitalize">{platform}:</span>
                    <span className="text-blue-600">{source}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-blue-700 mt-2">
                Last updated: {new Date(socialMediaData.metadata.timestamp).toLocaleString()}
              </p>
            </Card>
          </div>
        )}

        {/* Analytics Data */}
        {analyticsData && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Performance Analytics</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Engagement</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {analyticsData.data.overview.totalEngagement.toLocaleString()}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Heart className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Reach</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {analyticsData.data.overview.totalReach.toLocaleString()}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Engagement Rate</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {analyticsData.data.overview.engagementRate}%
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </Card>
            </div>

            {/* Platform Distribution */}
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Platform Distribution</h3>
              <div className="grid md:grid-cols-5 gap-4">
                {analyticsData.data.platforms.map((platform, index) => (
                  <div key={index} className="text-center">
                    <div 
                      className="w-16 h-16 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold"
                      style={{ backgroundColor: platform.color }}
                    >
                      {platform.value}%
                    </div>
                    <p className="text-sm font-medium text-gray-900">{platform.name}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* API Test Links */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">API Endpoints</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/api/social-media"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Social Media API
            </a>
            <a
              href="/api/analytics"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Analytics API
            </a>
            <a
              href="/api/ai-insights"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              AI Insights API
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 