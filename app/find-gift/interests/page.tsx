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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-6 sm:py-8 md:py-12">
      <div className="max-w-4xl mx-auto px-3 sm:px-4">
        {/* Progress Bar */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-center mb-3 sm:mb-4">
            <div className="text-xs sm:text-sm text-gray-600">Step 3 of 4</div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-1.5 sm:h-2 rounded-full" style={{ width: '75%' }}></div>
          </div>
        </div>

        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 md:p-8">
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center justify-center p-3 sm:p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-3 sm:mb-4">
              <Heart className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 px-2">
              What are their interests?
            </h1>
            <p className="text-sm sm:text-base text-gray-600 px-2">
              Select all that apply to get more personalized recommendations
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
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
            {interestOptions.map((interest) => (
              <button
                key={interest}
                onClick={() => handleInterestToggle(interest)}
                className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 transition-all transform hover:scale-105 ${
                  selectedInterests.includes(interest)
                    ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 text-purple-700 shadow-lg'
                    : 'border-gray-200 hover:border-purple-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="text-xs sm:text-sm font-semibold capitalize">{interest}</div>
                {selectedInterests.includes(interest) && (
                  <div className="absolute -top-2 -right-2 bg-purple-500 text-white rounded-full p-1">
                    <Check className="w-3 h-3" />
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
            <Link
              href="/find-gift/age"
              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors text-sm sm:text-base"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>

            <button
              onClick={handleNext}
              disabled={selectedInterests.length === 0}
              className={`flex items-center px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all transform w-full sm:w-auto justify-center ${
                selectedInterests.length > 0
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 hover:scale-105 shadow-lg'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Next Step
              <ArrowRight className="w-4 h-4 ml-2" />
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
