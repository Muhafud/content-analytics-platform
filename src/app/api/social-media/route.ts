import { NextRequest, NextResponse } from 'next/server';
import { SocialMediaAggregator } from '@/services/social-media';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Get account usernames from query parameters
    const twitter = searchParams.get('twitter');
    const linkedin = searchParams.get('linkedin');
    const instagram = searchParams.get('instagram');

    // If no accounts provided, use default mock accounts
    const accounts = {
      twitter: twitter || 'contentanalytics',
      linkedin: linkedin || 'content-analytics-platform',
      instagram: instagram || 'contentanalytics',
    };

    console.log('Fetching social media data for accounts:', accounts);

    // Aggregate data from all platforms
    const aggregatedData = await SocialMediaAggregator.aggregateData(accounts);

    // Add metadata about data sources
    const response = {
      ...aggregatedData,
      metadata: {
        data_sources: {
          twitter: twitter ? 'API' : 'Mock Data (API not configured)',
          linkedin: linkedin ? 'API' : 'Mock Data (API not configured)',
          instagram: instagram ? 'API' : 'Mock Data (API not configured)',
        },
        timestamp: new Date().toISOString(),
        note: 'Some platforms may be using mock data due to API limitations. Configure API keys in .env.local for real data.',
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Social media API error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch social media data',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { postIds } = body;

    if (!postIds || !Array.isArray(postIds)) {
      return NextResponse.json(
        { error: 'postIds array is required' },
        { status: 400 }
      );
    }

    // Get real-time updates for specific posts
    const updates = await SocialMediaAggregator.getRealTimeUpdates(postIds);

    return NextResponse.json({
      updates,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Real-time updates API error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch real-time updates',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 