'use client';

import React from 'react';
import { Brain, TrendingUp, Clock, Target, Lightbulb, AlertTriangle } from 'lucide-react';

const insights = [
  {
    type: 'sentiment',
    title: 'Positive Sentiment Trend',
    description: 'Your content is resonating well with your audience. Sentiment analysis shows 78% positive reactions.',
    icon: TrendingUp,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    confidence: 94,
  },
  {
    type: 'timing',
    title: 'Optimal Posting Time',
    description: 'Posts published between 2-4 PM EST perform 23% better than other times.',
    icon: Clock,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    confidence: 87,
  },
  {
    type: 'audience',
    title: 'Audience Growth Opportunity',
    description: 'Your content appeals to tech professionals aged 25-34. Consider targeting this demographic more.',
    icon: Target,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    confidence: 82,
  },
  {
    type: 'content',
    title: 'Content Optimization',
    description: 'Posts with images perform 40% better. Consider adding visual content to your posts.',
    icon: Lightbulb,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    confidence: 89,
  },
];

const recommendations = [
  {
    title: 'Increase video content',
    impact: 'High',
    effort: 'Medium',
    description: 'Video posts show 2.5x higher engagement rates',
  },
  {
    title: 'Post more on LinkedIn',
    impact: 'Medium',
    effort: 'Low',
    description: 'Your audience is most active on LinkedIn',
  },
  {
    title: 'Use more hashtags',
    impact: 'Medium',
    effort: 'Low',
    description: 'Posts with 3-5 hashtags perform better',
  },
];

export function AIInsights() {
  return (
    <div className="space-y-6">
      {/* AI Insights Header */}
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
          <Brain className="w-4 h-4 text-white" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">AI Insights</h2>
          <p className="text-sm text-gray-500">Powered by machine learning</p>
        </div>
      </div>

      {/* Insights */}
      <div className="space-y-4">
        {insights.map((insight, index) => (
          <div key={index} className="p-4 bg-white rounded-lg border border-gray-200">
            <div className="flex items-start space-x-3">
              <div className={`w-8 h-8 ${insight.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                <insight.icon className={`w-4 h-4 ${insight.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">{insight.title}</h3>
                  <span className="text-xs text-gray-500">{insight.confidence}% confidence</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{insight.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Recommendations</h3>
        <div className="space-y-3">
          {recommendations.map((rec, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <h4 className="text-sm font-medium text-gray-900">{rec.title}</h4>
                <p className="text-xs text-gray-500 mt-1">{rec.description}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  rec.impact === 'High' 
                    ? 'bg-red-100 text-red-800'
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {rec.impact}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  rec.effort === 'Low' 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {rec.effort}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Status */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 border border-purple-200">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-gray-900">AI Analysis Active</span>
        </div>
        <p className="text-xs text-gray-600 mt-1">
          Continuously analyzing your content for new insights
        </p>
      </div>
    </div>
  );
} 