'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-12 px-4">
      <GiftRecommendationResults
        recommendations={recommendations}
        onReset={handleReset}
        loadingMessage={isLoading ? loadingMessage : undefined}
      />
    </div>
  );
}
