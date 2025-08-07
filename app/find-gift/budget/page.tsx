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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="text-sm text-gray-600">Step 4 of 4</div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{ width: '100%' }}></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-full w-20 h-20 mx-auto mb-6">
              <DollarSign className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              What's your budget?
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Help us find gifts that fit your budget. We'll show you the best options within your price range.
            </p>
          </div>

          {/* Budget Selection */}
          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {budgetRanges.map((range) => (
                <button
                  key={range.value}
                  onClick={() => setBudget(range.value)}
                  className={`p-6 rounded-2xl border-2 transition-all transform hover:scale-105 text-left ${
                    budget === range.value
                      ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 text-purple-700 shadow-lg'
                      : 'border-gray-200 hover:border-purple-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="text-xl font-bold mb-1">{range.label}</div>
                  <div className="text-sm opacity-75">{range.desc}</div>
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
          <div className="flex justify-between items-center">
            <button
              onClick={handleBack}
              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </button>

            <button
              onClick={handleFinish}
              className="flex items-center px-8 py-4 rounded-full font-semibold text-lg transition-all transform bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 hover:scale-105 shadow-lg"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Find My Perfect Gifts!
              <ArrowRight className="w-5 h-5 ml-2" />
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
