'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Heart, ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { interestOptions } from '../../data/giftData';

export default function InterestsPage() {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [recipientType, setRecipientType] = useState('');
  const [ageGroup, setAgeGroup] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Get stored preferences
    const stored = sessionStorage.getItem('giftPreferences');
    if (stored) {
      const preferences = JSON.parse(stored);
      setRecipientType(preferences.recipientType || '');
      setAgeGroup(preferences.ageGroup || '');
      if (!preferences.recipientType || !preferences.ageGroup) {
        router.push('/find-gift');
      }
    } else {
      router.push('/find-gift');
    }
  }, [router]);

  const handleInterestToggle = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleNext = () => {
    const stored = sessionStorage.getItem('giftPreferences');
    const preferences = stored ? JSON.parse(stored) : {};
    preferences.interests = selectedInterests;
    sessionStorage.setItem('giftPreferences', JSON.stringify(preferences));
    router.push('/find-gift/budget');
  };

  const handleBack = () => {
    router.push('/find-gift/age');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="text-sm text-gray-600">Step 3 of 4</div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{ width: '75%' }}></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-full w-20 h-20 mx-auto mb-6">
              <Heart className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              What are they interested in?
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Select all interests that apply to your{' '}
              <span className="font-semibold text-purple-600 capitalize">{recipientType}</span>.
              The more you select, the better our recommendations will be!
            </p>
          </div>

          {/* Selected Count */}
          {selectedInterests.length > 0 && (
            <div className="text-center mb-6">
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                {selectedInterests.length} interest{selectedInterests.length !== 1 ? 's' : ''} selected
              </span>
            </div>
          )}

          {/* Interest Options */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-8 max-h-96 overflow-y-auto">
            {interestOptions.map((interest) => (
              <button
                key={interest}
                onClick={() => handleInterestToggle(interest)}
                className={`p-4 rounded-xl border-2 transition-all transform hover:scale-105 relative ${
                  selectedInterests.includes(interest)
                    ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 text-purple-700 shadow-lg'
                    : 'border-gray-200 hover:border-purple-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="text-sm font-medium capitalize">
                  {interest.replace('-', ' ')}
                </div>
                {selectedInterests.includes(interest) && (
                  <div className="absolute -top-2 -right-2 bg-purple-500 text-white rounded-full p-1">
                    <Check className="w-3 h-3" />
                  </div>
                )}
              </button>
            ))}
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
              onClick={handleNext}
              className="flex items-center px-8 py-4 rounded-full font-semibold text-lg transition-all transform bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 hover:scale-105 shadow-lg"
            >
              Continue
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>

        {/* Help Text */}
        <div className="text-center mt-8">
          <p className="text-gray-600">
            Don't worry if you're not sure about some interests - you can skip them and still get great recommendations!
          </p>
        </div>
      </div>
    </div>
  );
}
