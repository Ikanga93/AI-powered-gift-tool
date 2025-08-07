'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles } from 'lucide-react';
import GiftRecommendationResults from '../../components/GiftRecommendationResults';
import { GiftRecommendationEngine, UserPreferences, RecommendationResult } from '../../utils/giftRecommendationEngine';

export default function ResultsPage() {
  const [recommendations, setRecommendations] = useState<RecommendationResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const router = useRouter();

  const engine = new GiftRecommendationEngine();

  useEffect(() => {
    const loadRecommendations = async () => {
      // Get stored preferences
      const stored = sessionStorage.getItem('giftPreferences');
      if (!stored) {
        router.push('/find-gift');
        return;
      }

      const prefs = JSON.parse(stored) as UserPreferences;
      
      // Validate required fields
      if (!prefs.recipientType || !prefs.ageGroup) {
        router.push('/find-gift');
        return;
      }

      setPreferences(prefs);
      setLoadingMessage(engine.getRandomLoadingMessage());

      try {
        // Update loading message periodically
        const messageInterval = setInterval(() => {
          setLoadingMessage(engine.getRandomLoadingMessage());
        }, 800);

        const results = await engine.getRecommendations(prefs);
        
        clearInterval(messageInterval);
        setRecommendations(results);
      } catch (error) {
        console.error('Error getting recommendations:', error);
        setRecommendations([]);
      } finally {
        setIsLoading(false);
        setLoadingMessage('');
      }
    };

    loadRecommendations();
  }, [router]);

  const handleReset = () => {
    // Clear stored preferences
    sessionStorage.removeItem('giftPreferences');
    router.push('/find-gift');
  };

  if (!preferences) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your preferences...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-6 sm:py-8 md:py-12">
      <div className="max-w-6xl mx-auto px-3 sm:px-4">
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center p-3 sm:p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-3 sm:mb-4">
            <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 px-2">
            Perfect Gift Recommendations
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 px-2">
            Based on your preferences, here are our top AI-powered suggestions
          </p>
        </div>
        <GiftRecommendationResults
          recommendations={recommendations}
          onReset={handleReset}
          loadingMessage={isLoading ? loadingMessage : undefined}
        />
      </div>
    </div>
  );
}
