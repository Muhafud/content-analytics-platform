'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const performanceData = [
  { date: 'Mon', engagement: 2400, reach: 1800, impressions: 3200 },
  { date: 'Tue', engagement: 1398, reach: 2210, impressions: 2800 },
  { date: 'Wed', engagement: 9800, reach: 2290, impressions: 3900 },
  { date: 'Thu', engagement: 3908, reach: 2000, impressions: 4800 },
  { date: 'Fri', engagement: 4800, reach: 2181, impressions: 3800 },
  { date: 'Sat', engagement: 3800, reach: 2500, impressions: 4300 },
  { date: 'Sun', engagement: 4300, reach: 2100, impressions: 4100 },
];

const platformData = [
  { name: 'Twitter', value: 35, color: '#1DA1F2' },
  { name: 'LinkedIn', value: 25, color: '#0077B5' },
  { name: 'Instagram', value: 20, color: '#E4405F' },
  { name: 'Facebook', value: 15, color: '#1877F2' },
  { name: 'Other', value: 5, color: '#6B7280' },
];

const topContent = [
  {
    title: 'How AI is transforming content marketing',
    platform: 'LinkedIn',
    engagement: 1240,
    reach: 8900,
    performance: 'Excellent',
  },
  {
    title: '5 tips for better social media engagement',
    platform: 'Twitter',
    engagement: 890,
    reach: 5600,
    performance: 'Good',
  },
  {
    title: 'The future of digital marketing',
    platform: 'Instagram',
    engagement: 670,
    reach: 4200,
    performance: 'Good',
  },
];

export function ContentPerformance() {
  return (
    <div className="space-y-6">
      {/* Performance Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="engagement" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  name="Engagement"
                />
                <Line 
                  type="monotone" 
                  dataKey="reach" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  name="Reach"
                />
                <Line 
                  type="monotone" 
                  dataKey="impressions" 
                  stroke="#8B5CF6" 
                  strokeWidth={2}
                  name="Impressions"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Platform Distribution and Top Content */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Platform Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Platform Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={platformData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {platformData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Top Performing Content */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Content</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topContent.map((content, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 text-sm line-clamp-1">
                      {content.title}
                    </h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-gray-500">{content.platform}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        content.performance === 'Excellent' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {content.performance}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">
                      {content.engagement.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500">
                      {content.reach.toLocaleString()} reach
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 