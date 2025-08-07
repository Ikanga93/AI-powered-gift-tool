'use client';

import { useRouter } from 'next/navigation';
import { RecommendationResult } from '../utils/giftRecommendationEngine';
import { Star, DollarSign, Tag, RefreshCw } from 'lucide-react';

interface GiftRecommendationResultsProps {
  recommendations: RecommendationResult[];
  onReset: () => void;
  loadingMessage?: string;
}

export default function GiftRecommendationResults({ 
  recommendations, 
  onReset, 
  loadingMessage 
}: GiftRecommendationResultsProps) {
  const router = useRouter();

  const handleSelectGift = (recommendation: RecommendationResult) => {
    // Store selected gift in sessionStorage for checkout flow
    sessionStorage.setItem('selectedGift', JSON.stringify({
      gift: recommendation.gift,
      score: recommendation.score,
      reasoning: recommendation.reasoning
    }));
    router.push('/checkout');
  };
  if (loadingMessage) {
    return (
      <div className="max-w-4xl mx-auto px-3 sm:px-4">
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 border-b-2 border-purple-500 mx-auto mb-3 sm:mb-4"></div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Finding Perfect Gifts</h2>
          <p className="text-sm sm:text-base text-gray-600">{loadingMessage}</p>
        </div>
      </div>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getScoreStars = (score: number) => {
    const stars = Math.round((score / 100) * 5);
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < stars ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          🎁 Your Personalized Gift Recommendations
        </h2>
        <p className="text-gray-600 mb-6">
          Our AI found {recommendations.length} perfect gift{recommendations.length !== 1 ? 's' : ''} for you!
        </p>
        <button
          onClick={onReset}
          className="inline-flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Find Different Gifts
        </button>
      </div>

      {recommendations.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <p className="text-gray-600 text-lg">
            Sorry, we couldn't find any gifts matching your criteria. 
            Try adjusting your preferences or budget.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map((recommendation, index) => (
            <div
              key={recommendation.gift.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6 border border-gray-100"
            >
              {/* Ranking Badge */}
              <div className="flex justify-between items-start mb-4">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                  #{index + 1} Match
                  </div>
                </div>
              {/* Gift Info */}
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {recommendation.gift.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  {recommendation.gift.description}
                </p>
                
                {/* Star Rating */}
                <div className="flex items-center mb-3">
                  <div className="flex mr-2">
                    {getScoreStars(recommendation.score)}
                  </div>
                  <span className="text-sm text-gray-500">
                    ({Math.round(recommendation.score)}/100)
                  </span>
                </div>

                {/* Category */}
                <div className="flex items-center mb-4">
                  <Tag className="w-4 h-4 text-purple-600 mr-1" />
                  <span className="text-sm text-purple-600 font-medium">
                    {recommendation.gift.category}
                  </span>
                </div>
              </div>

              {/* AI Reasoning */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg mb-4">
                <h4 className="font-semibold text-gray-800 mb-2 text-sm">
                  🤖 Why AI Recommends This:
                </h4>
                <p className="text-sm text-gray-700">
                  {recommendation.reasoning}
                </p>
              </div>

              {/* Interests Tags */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {recommendation.gift.interests.slice(0, 3).map((interest) => (
                    <span
                      key={interest}
                      className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full capitalize"
                    >
                      {interest.replace('-', ' ')}
                    </span>
                  ))}
                  {recommendation.gift.interests.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      +{recommendation.gift.interests.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <button 
                onClick={() => handleSelectGift(recommendation)}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-4 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105"
              >
                I Like This Gift! 💝
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
