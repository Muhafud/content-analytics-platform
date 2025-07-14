'use client';

import React from 'react';
import { TrendingUp, TrendingDown, Users, Eye, Heart, Share2, MessageCircle } from 'lucide-react';

const metrics = [
  {
    name: 'Total Engagement',
    value: '24.5K',
    change: '+12.3%',
    changeType: 'positive' as const,
    icon: Heart,
    description: 'Likes, comments, shares',
  },
  {
    name: 'Total Reach',
    value: '156.2K',
    change: '+8.7%',
    changeType: 'positive' as const,
    icon: Users,
    description: 'Unique users reached',
  },
  {
    name: 'Total Impressions',
    value: '892.1K',
    change: '+15.2%',
    changeType: 'positive' as const,
    icon: Eye,
    description: 'Total views',
  },
  {
    name: 'Engagement Rate',
    value: '4.2%',
    change: '-2.1%',
    changeType: 'negative' as const,
    icon: TrendingUp,
    description: 'Avg. engagement per post',
  },
  {
    name: 'Shares',
    value: '3.2K',
    change: '+18.9%',
    changeType: 'positive' as const,
    icon: Share2,
    description: 'Content shared',
  },
  {
    name: 'Comments',
    value: '1.8K',
    change: '+5.4%',
    changeType: 'positive' as const,
    icon: MessageCircle,
    description: 'User interactions',
  },
];

export function AnalyticsOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {metrics.map((metric) => (
        <div key={metric.name} className="metric-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="metric-label">{metric.name}</p>
              <p className="metric-value">{metric.value}</p>
              <p className="text-xs text-gray-500 mt-1">{metric.description}</p>
            </div>
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <metric.icon className="w-6 h-6 text-gray-600" />
            </div>
          </div>
          
          <div className="flex items-center mt-4">
            {metric.changeType === 'positive' ? (
              <TrendingUp className="w-4 h-4 text-success-600 mr-1" />
            ) : (
              <TrendingDown className="w-4 h-4 text-error-600 mr-1" />
            )}
            <span className={`metric-change ${
              metric.changeType === 'positive' ? 'metric-change-positive' : 'metric-change-negative'
            }`}>
              {metric.change}
            </span>
            <span className="text-xs text-gray-500 ml-1">vs last week</span>
          </div>
        </div>
      ))}
    </div>
  );
} 