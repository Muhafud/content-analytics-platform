'use client';

import React from 'react';
import { MessageSquare, Heart, Share2, Eye, TrendingUp, Clock } from 'lucide-react';

const activities = [
  {
    id: 1,
    type: 'post',
    title: 'How AI is transforming content marketing',
    platform: 'LinkedIn',
    engagement: 1240,
    time: '2 hours ago',
    icon: TrendingUp,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  {
    id: 2,
    type: 'comment',
    title: 'Great insights on social media trends',
    platform: 'Twitter',
    engagement: 89,
    time: '4 hours ago',
    icon: MessageSquare,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    id: 3,
    type: 'like',
    title: '5 tips for better engagement',
    platform: 'Instagram',
    engagement: 567,
    time: '6 hours ago',
    icon: Heart,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
  },
  {
    id: 4,
    type: 'share',
    title: 'The future of digital marketing',
    platform: 'Facebook',
    engagement: 234,
    time: '8 hours ago',
    icon: Share2,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
  {
    id: 5,
    type: 'view',
    title: 'Content strategy best practices',
    platform: 'LinkedIn',
    engagement: 890,
    time: '1 day ago',
    icon: Eye,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
  },
];

export function RecentActivity() {
  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
          <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
            View all
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className={`w-8 h-8 ${activity.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                <activity.icon className={`w-4 h-4 ${activity.color}`} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900 truncate">
                    {activity.title}
                  </h3>
                  <span className="text-xs text-gray-500 flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {activity.time}
                  </span>
                </div>
                
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xs text-gray-500">{activity.platform}</span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-500">
                    {activity.engagement.toLocaleString()} {activity.type}s
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-center">
            <button className="text-sm text-gray-500 hover:text-gray-700 font-medium">
              Load more activity
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 