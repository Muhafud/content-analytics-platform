import { NextRequest, NextResponse } from 'next/server';
import { OpenAIService } from '@/services/openai';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { content, platform, userId } = body;

    if (!content) {
      return NextResponse.json(
        {
          success: false,
          error: 'Content is required',
        },
        { status: 400 }
      );
    }

    // Check if OpenAI API key is available
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        {
          success: false,
          error: 'OpenAI API key not configured',
        },
        { status: 500 }
      );
    }

    // Analyze content with OpenAI
    const analysis = await OpenAIService.analyzeContent(content, platform);

    // Generate recommendations based on the analysis
    const recommendations = await OpenAIService.generateRecommendations(
      {
        content,
        platform,
        analysis,
      },
      platform || 'general'
    );

    const result = {
      success: true,
      data: {
        analysis,
        recommendations,
        timestamp: new Date().toISOString(),
        modelVersion: 'gpt-4-turbo',
      },
      message: 'Content analyzed successfully',
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error('Content analysis error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to analyze content',
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const content = searchParams.get('content');
    const platform = searchParams.get('platform');

    if (!content) {
      return NextResponse.json(
        {
          success: false,
          error: 'Content parameter is required',
        },
        { status: 400 }
      );
    }

    // Check if OpenAI API key is available
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        {
          success: false,
          error: 'OpenAI API key not configured',
        },
        { status: 500 }
      );
    }

    // Analyze content with OpenAI
    const analysis = await OpenAIService.analyzeContent(content, platform || undefined);

    return NextResponse.json({
      success: true,
      data: {
        analysis,
        timestamp: new Date().toISOString(),
        modelVersion: 'gpt-4-turbo',
      },
      message: 'Content analyzed successfully',
    });
  } catch (error) {
    console.error('Content analysis error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to analyze content',
      },
      { status: 500 }
    );
  }
} 