import React from 'react';
import Link from 'next/link';
import { 
  BarChart3, 
  Brain, 
  TrendingUp, 
  Users, 
  Zap, 
  Shield, 
  Globe, 
  ArrowRight,
  CheckCircle,
  Star
} from 'lucide-react';
import { DarkModeToggle } from '@/components/ui/DarkModeToggle';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 transition-colors duration-500">
      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">ContentAI</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
              Features
            </Link>
            <Link href="#pricing" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
              Pricing
            </Link>
            <Link href="#about" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
              About
            </Link>
            <Link href="/auth/signin" className="btn-primary">
              Get Started
            </Link>
            <DarkModeToggle />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-6">
              <Star className="w-4 h-4 mr-2" />
              Trusted by 500+ marketing professionals
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            AI-Powered
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Content Analytics
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Transform your content strategy with real-time AI insights. Analyze thousands of posts, 
            predict engagement, and optimize your marketing campaigns with 94% accuracy.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/auth/signin" className="btn-primary text-lg px-8 py-4">
              Start Free Trial
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link href="#demo" className="btn-secondary text-lg px-8 py-4">
              Watch Demo
            </Link>
          </div>
          
          <div className="mt-12 flex items-center justify-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
              No credit card required
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
              14-day free trial
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
              Cancel anytime
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything you need to dominate content marketing
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From real-time analytics to AI-powered insights, we've got you covered
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card-hover">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Real-time Analytics
              </h3>
              <p className="text-gray-600">
                Monitor your content performance in real-time with live dashboards and instant notifications.
              </p>
            </div>
            
            <div className="card-hover">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                AI-Powered Insights
              </h3>
              <p className="text-gray-600">
                Get intelligent recommendations for content optimization and audience targeting.
              </p>
            </div>
            
            <div className="card-hover">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Predictive Analytics
              </h3>
              <p className="text-gray-600">
                Forecast content performance with 94% accuracy using advanced machine learning models.
              </p>
            </div>
            
            <div className="card-hover">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Audience Analysis
              </h3>
              <p className="text-gray-600">
                Deep dive into your audience demographics, behavior patterns, and engagement preferences.
              </p>
            </div>
            
            <div className="card-hover">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Multi-Platform Integration
              </h3>
              <p className="text-gray-600">
                Connect all your social media accounts and analyze performance across platforms.
              </p>
            </div>
            
            <div className="card-hover">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Enterprise Security
              </h3>
              <p className="text-gray-600">
                Bank-level security with SOC 2 compliance and end-to-end encryption.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-6 py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">10,000+</div>
              <div className="text-blue-100">Posts Analyzed Daily</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">94%</div>
              <div className="text-blue-100">Prediction Accuracy</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">500+</div>
              <div className="text-blue-100">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">60%</div>
              <div className="text-blue-100">Time Saved</div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="px-6 py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              See ContentAI in Action
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Watch how our platform analyzes your content and provides actionable insights
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Demo Content */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-lg border">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Live Analytics Demo</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Engagement</span>
                    <span className="font-semibold text-green-600">+24.5K</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Engagement Rate</span>
                    <span className="font-semibold text-blue-600">4.2%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Top Performing Post</span>
                    <span className="font-semibold text-purple-600">AI Analytics Guide</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg border">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">AI Insights</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <p className="text-sm text-gray-600">Your content performs 23% better on Tuesdays</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <p className="text-sm text-gray-600">Hashtags increase engagement by 45%</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                    <p className="text-sm text-gray-600">Video content gets 3x more shares</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Demo Actions */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-8 shadow-lg border">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Try It Yourself</h3>
                
                <div className="space-y-4">
                  <Link href="/dashboard" className="w-full btn-primary text-center py-3">
                    View Live Dashboard
                  </Link>
                  
                  <div className="text-center">
                    <span className="text-sm text-gray-500">or</span>
                  </div>
                  
                  <a 
                    href="/api/social-media"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full btn-secondary py-3 text-center block"
                  >
                    Test Social Media API
                  </a>
                  
                  <a 
                    href="/api/analytics"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full btn-secondary py-3 text-center block"
                  >
                    Test Analytics API
                  </a>
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">What You'll See:</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Real-time social media metrics</li>
                    <li>• AI-powered content insights</li>
                    <li>• Multi-platform analytics</li>
                    <li>• Predictive engagement data</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 bg-white dark:bg-gray-900 transition-colors duration-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to transform your content strategy?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Join hundreds of marketing professionals who are already using AI to optimize their content.
          </p>
          <Link href="/auth/signin" className="btn-primary text-lg px-8 py-4 mx-auto inline-flex items-center justify-center">
            Start Your Free Trial
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">ContentAI</span>
              </div>
              <p className="text-gray-400">
                AI-powered content analytics platform for modern marketing teams.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">API</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Integrations</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Documentation</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Status</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Community</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ContentAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 