import React from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { AnalyticsOverview } from '@/components/dashboard/AnalyticsOverview';
import { ContentPerformance } from '@/components/dashboard/ContentPerformance';
import { AIInsights } from '@/components/dashboard/AIInsights';
import { RecentActivity } from '@/components/dashboard/RecentActivity';

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Welcome back! Here's what's happening with your content today.
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              Live Data
            </span>
          </div>
        </div>

        {/* Analytics Overview */}
        <AnalyticsOverview />

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Content Performance */}
          <div className="lg:col-span-2">
            <ContentPerformance />
          </div>

          {/* AI Insights */}
          <div>
            <AIInsights />
          </div>
        </div>

        {/* Recent Activity */}
        <RecentActivity />
      </div>
    </DashboardLayout>
  );
} 