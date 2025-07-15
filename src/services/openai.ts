import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface ContentAnalysis {
  sentiment: 'positive' | 'negative' | 'neutral';
  confidence: number;
  topics: string[];
  keywords: string[];
  recommendations: string[];
  engagement_prediction: number;
  optimal_posting_time?: string;
  target_audience?: string;
}

export interface SentimentAnalysis {
  overall: 'positive' | 'negative' | 'neutral';
  score: number;
  breakdown: {
    positive: number;
    neutral: number;
    negative: number;
  };
  emotions: string[];
}

export class OpenAIService {
  static async analyzeContent(content: string, platform?: string): Promise<ContentAnalysis> {
    try {
      const prompt = `
        Analyze the following social media content and provide detailed insights:
        
        Content: "${content}"
        Platform: ${platform || 'Unknown'}
        
        Please provide a JSON response with the following structure:
        {
          "sentiment": "positive|negative|neutral",
          "confidence": 0.0-1.0,
          "topics": ["topic1", "topic2"],
          "keywords": ["keyword1", "keyword2"],
          "recommendations": ["recommendation1", "recommendation2"],
          "engagement_prediction": 0-100,
          "optimal_posting_time": "suggestion if applicable",
          "target_audience": "audience description if applicable"
        }
        
        Focus on:
        - Sentiment analysis with confidence score
        - Key topics and themes
        - SEO keywords and hashtags
        - Engagement optimization recommendations
        - Target audience identification
        - Platform-specific best practices
      `;

      const completion = await openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: 'You are an expert social media analyst and content strategist. Provide accurate, actionable insights for content optimization.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 1000,
      });

      const response = completion.choices[0]?.message?.content;
      if (!response) {
        throw new Error('No response from OpenAI');
      }

      // Parse the JSON response
      const analysis = JSON.parse(response) as ContentAnalysis;
      return analysis;
    } catch (error) {
      console.error('OpenAI analysis error:', error);
      // Return fallback analysis
      return {
        sentiment: 'neutral',
        confidence: 0.5,
        topics: ['general'],
        keywords: [],
        recommendations: ['Consider adding more specific content'],
        engagement_prediction: 50,
      };
    }
  }

  /**
   * Generate content recommendations based on performance data
   */
  static async generateRecommendations(
    performanceData: any,
    platform: string
  ): Promise<string[]> {
    try {
      const prompt = `
        Based on the following content performance data, generate 5 specific, actionable recommendations for improvement:
        
        Performance Data: ${JSON.stringify(performanceData)}
        Platform: ${platform}
        
        Provide recommendations in this JSON format:
        {
          "recommendations": [
            {
              "title": "Recommendation title",
              "description": "Detailed explanation",
              "impact": "high|medium|low",
              "effort": "high|medium|low",
              "reasoning": "Why this will help"
            }
          ]
        }
      `;

      const completion = await openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: 'You are a data-driven content strategist. Provide specific, actionable recommendations based on performance data.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.4,
        max_tokens: 800,
      });

      const response = completion.choices[0]?.message?.content;
      if (!response) {
        throw new Error('No response from OpenAI');
      }

      const result = JSON.parse(response);
      return result.recommendations || [];
    } catch (error) {
      console.error('OpenAI recommendations error:', error);
      return [
        'Focus on creating more engaging content',
        'Post during peak engagement hours',
        'Use relevant hashtags',
        'Include visual content',
        'Engage with your audience'
      ];
    }
  }

  /**
   * Predict engagement for new content
   */
  static async predictEngagement(
    content: string,
    platform: string,
    historicalData: any
  ): Promise<number> {
    try {
      const prompt = `
        Predict the engagement rate for this content based on historical performance:
        
        Content: "${content}"
        Platform: ${platform}
        Historical Performance: ${JSON.stringify(historicalData)}
        
        Return only a number between 0-100 representing the predicted engagement rate.
      `;

      const completion = await openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: 'You are an expert at predicting social media engagement. Provide accurate predictions based on content analysis and historical data.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.2,
        max_tokens: 50,
      });

      const response = completion.choices[0]?.message?.content;
      if (!response) {
        throw new Error('No response from OpenAI');
      }

      const prediction = parseFloat(response.trim());
      return isNaN(prediction) ? 50 : Math.max(0, Math.min(100, prediction));
    } catch (error) {
      console.error('OpenAI prediction error:', error);
      return 50; // Default prediction
    }
  }

  /**
   * Analyze audience sentiment trends
   */
  static async analyzeSentimentTrends(
    contentHistory: Array<{ content: string; engagement: number; sentiment: string }>
  ): Promise<SentimentAnalysis> {
    try {
      const prompt = `
        Analyze the sentiment trends in this content history:
        
        ${contentHistory.map(item => 
          `Content: "${item.content}" | Engagement: ${item.engagement} | Sentiment: ${item.sentiment}`
        ).join('\n')}
        
        Provide a JSON response with:
        {
          "overall": "positive|negative|neutral",
          "score": 0.0-1.0,
          "breakdown": {
            "positive": percentage,
            "neutral": percentage,
            "negative": percentage
          },
          "emotions": ["emotion1", "emotion2"]
        }
      `;

      const completion = await openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: 'You are an expert at analyzing sentiment trends in social media content.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 500,
      });

      const response = completion.choices[0]?.message?.content;
      if (!response) {
        throw new Error('No response from OpenAI');
      }

      return JSON.parse(response) as SentimentAnalysis;
    } catch (error) {
      console.error('OpenAI sentiment trends error:', error);
      return {
        overall: 'neutral',
        score: 0.5,
        breakdown: { positive: 33, neutral: 34, negative: 33 },
        emotions: ['neutral']
      };
    }
  }
} 