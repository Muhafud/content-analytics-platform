'use client';

import { useEffect, useState, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';

export interface RealTimeData {
  analytics?: any;
  engagement?: any;
  aiInsights?: any;
  alerts?: any;
}

export interface UseRealTimeDataOptions {
  userId?: string;
  platforms?: string[];
  autoConnect?: boolean;
}

export function useRealTimeData(options: UseRealTimeDataOptions = {}) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [data, setData] = useState<RealTimeData>({});
  const [error, setError] = useState<string | null>(null);

  const connect = useCallback(() => {
    if (socket?.connected) return;

    const newSocket = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3000', {
      transports: ['websocket', 'polling'],
      autoConnect: true,
    });

    newSocket.on('connect', () => {
      setIsConnected(true);
      setError(null);
      console.log('Connected to real-time service');

      // Authenticate if userId is provided
      if (options.userId) {
        newSocket.emit('authenticate', options.userId);
      }

      // Subscribe to dashboard updates
      if (options.userId && options.platforms) {
        newSocket.emit('subscribe_dashboard', {
          userId: options.userId,
          platforms: options.platforms,
        });
      }
    });

    newSocket.on('disconnect', () => {
      setIsConnected(false);
      console.log('Disconnected from real-time service');
    });

    newSocket.on('connect_error', (err) => {
      setError(`Connection error: ${err.message}`);
      console.error('Socket connection error:', err);
    });

    // Listen for analytics updates
    newSocket.on('analytics_update', (update) => {
      setData(prev => ({
        ...prev,
        analytics: update.data,
      }));
    });

    // Listen for engagement updates
    newSocket.on('engagement_update', (update) => {
      setData(prev => ({
        ...prev,
        engagement: update.data,
      }));
    });

    // Listen for AI insights
    newSocket.on('ai_insight', (update) => {
      setData(prev => ({
        ...prev,
        aiInsights: update.data,
      }));
    });

    // Listen for alerts
    newSocket.on('alert', (update) => {
      setData(prev => ({
        ...prev,
        alerts: update.data,
      }));
    });

    // Listen for content analysis results
    newSocket.on('content_analysis', (update) => {
      setData(prev => ({
        ...prev,
        aiInsights: update.data,
      }));
    });

    setSocket(newSocket);
  }, [options.userId, options.platforms]);

  const disconnect = useCallback(() => {
    if (socket) {
      socket.disconnect();
      setSocket(null);
      setIsConnected(false);
    }
  }, [socket]);

  const analyzeContent = useCallback((content: string, platform: string) => {
    if (socket && options.userId) {
      socket.emit('analyze_content', {
        content,
        platform,
        userId: options.userId,
      });
    }
  }, [socket, options.userId]);

  const trackEngagement = useCallback((postIds: string[]) => {
    if (socket && options.userId) {
      socket.emit('track_engagement', {
        postIds,
        userId: options.userId,
      });
    }
  }, [socket, options.userId]);

  // Auto-connect on mount if enabled
  useEffect(() => {
    if (options.autoConnect !== false) {
      connect();
    }

    return () => {
      disconnect();
    };
  }, [connect, disconnect, options.autoConnect]);

  return {
    socket,
    isConnected,
    data,
    error,
    connect,
    disconnect,
    analyzeContent,
    trackEngagement,
  };
} 