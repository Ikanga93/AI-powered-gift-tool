'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { DollarSign, ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';

export default function BudgetPage() {
  const [budget, setBudget] = useState(100);
  const [occasion, setOccasion] = useState('');
  const [recipientType, setRecipientType] = useState('');
  const [ageGroup, setAgeGroup] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Get stored preferences
    const stored = sessionStorage.getItem('giftPreferences');
    if (stored) {
      const preferences = JSON.parse(stored);
      setRecipientType(preferences.recipientType || '');
      setAgeGroup(preferences.ageGroup || '');
      setInterests(preferences.interests || []);
      if (!preferences.recipientType || !preferences.ageGroup) {
        router.push('/find-gift');
      }
    } else {
      router.push('/find-gift');
    }
  }, [router]);

  const handleFinish = () => {
    const stored = sessionStorage.getItem('giftPreferences');
    const preferences = stored ? JSON.parse(stored) : {};
    preferences.budget = budget;
    preferences.occasion = occasion;
    sessionStorage.setItem('giftPreferences', JSON.stringify(preferences));
    router.push('/find-gift/results');
  };

  const handleBack = () => {
    router.push('/find-gift/interests');
  };

  const budgetRanges = [
    { value: 25, label: 'Under $25', desc: 'Small tokens & thoughtful gestures' },
    { value: 50, label: '$25 - $50', desc: 'Nice gifts for friends & family' },
    { value: 100, label: '$50 - $100', desc: 'Quality gifts for special people' },
    { value: 200, label: '$100 - $200', desc: 'Premium gifts for close relationships' },
    { value: 500, label: '$200+', desc: 'Luxury gifts for very special occasions' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-6 sm:py-8 md:py-12">
      <div className="max-w-4xl mx-auto px-3 sm:px-4">
        {/* Progress Bar */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-center mb-3 sm:mb-4">
            <div className="text-xs sm:text-sm text-gray-600">Step 4 of 4</div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-1.5 sm:h-2 rounded-full" style={{ width: '100%' }}></div>
          </div>
        </div>

        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 md:p-8">
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center justify-center p-3 sm:p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-3 sm:mb-4">
              <DollarSign className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 px-2">
              What's your budget?
            </h1>
            <p className="text-sm sm:text-base text-gray-600 px-2">
              Set your price range to get recommendations that fit your budget
            </p>
          </div>

          {/* Budget Selection */}
          <div className="mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6">
              {budgetRanges.map((range) => (
                <button
                  key={range.value}
                  onClick={() => setBudget(range.value)}
                  className={`p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl border-2 transition-all transform hover:scale-105 text-left ${
                    budget === range.value
                      ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 text-purple-700 shadow-lg'
                      : 'border-gray-200 hover:border-purple-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="text-base sm:text-lg md:text-xl font-semibold mb-1 sm:mb-2">{range.label}</div>
                  <div className="text-xs sm:text-sm text-gray-600">{range.desc}</div>
                </button>
              ))}
            </div>

            {/* Custom Budget Slider */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Or set a custom budget:</h3>
              <div className="space-y-4">
                <input
                  type="range"
                  min="10"
                  max="500"
                  step="10"
                  value={budget}
                  onChange={(e) => setBudget(parseInt(e.target.value))}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="text-center">
                  <span className="text-3xl font-bold text-purple-600">${budget}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>$10</span>
                  <span>$500+</span>
                </div>
              </div>
            </div>
          </div>

          {/* Occasion (Optional) */}
          <div className="mb-8">
            <label className="block text-lg font-semibold text-gray-700 mb-4">
              Special occasion? (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g., Birthday, Anniversary, Christmas, Graduation..."
              value={occasion}
              onChange={(e) => setOccasion(e.target.value)}
              className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:outline-none text-lg"
            />
          </div>

          {/* Summary */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Your Gift Profile:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Recipient:</span> <span className="capitalize">{recipientType}</span>
              </div>
              <div>
                <span className="font-medium">Age Group:</span> <span className="capitalize">{ageGroup.replace('-', ' ')}</span>
              </div>
              <div>
                <span className="font-medium">Interests:</span> <span>{interests.length} selected</span>
              </div>
              <div>
                <span className="font-medium">Budget:</span> <span>${budget}</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
            <Link
              href="/find-gift/interests"
              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors text-sm sm:text-base"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>

            <button
              onClick={handleFinish}
              disabled={!budget}
              className={`flex items-center px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all transform w-full sm:w-auto justify-center ${
                budget
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 hover:scale-105 shadow-lg'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Get Recommendations
              <Sparkles className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>

        {/* Help Text */}
        <div className="text-center mt-8">
          <p className="text-gray-600">
            Our AI will find the best gifts within your budget range, including options slightly above if they're worth it!
          </p>
        </div>
      </div>
    </div>
  );
}
