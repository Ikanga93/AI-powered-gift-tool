'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Calendar, ArrowRight, ArrowLeft } from 'lucide-react';
import { ageGroupOptions } from '../../data/giftData';

export default function AgePage() {
  const [selectedAge, setSelectedAge] = useState('');
  const [recipientType, setRecipientType] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Get stored preferences
    const stored = sessionStorage.getItem('giftPreferences');
    if (stored) {
      const preferences = JSON.parse(stored);
      setRecipientType(preferences.recipientType || '');
    } else {
      // Redirect back if no recipient type selected
      router.push('/find-gift');
    }
  }, [router]);

  const handleNext = () => {
    if (selectedAge) {
      const stored = sessionStorage.getItem('giftPreferences');
      const preferences = stored ? JSON.parse(stored) : {};
      preferences.ageGroup = selectedAge;
      sessionStorage.setItem('giftPreferences', JSON.stringify(preferences));
      router.push('/find-gift/interests');
    }
  };

  const handleBack = () => {
    router.push('/find-gift');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-6 sm:py-8 md:py-12">
      <div className="max-w-4xl mx-auto px-3 sm:px-4">
        {/* Progress Bar */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-center mb-3 sm:mb-4">
            <div className="text-xs sm:text-sm text-gray-600">Step 2 of 4</div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-1.5 sm:h-2 rounded-full" style={{ width: '50%' }}></div>
          </div>
        </div>

        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 md:p-8">
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center justify-center p-3 sm:p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-3 sm:mb-4">
              <Calendar className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 px-2">
              What's their age group?
            </h1>
            <p className="text-sm sm:text-base text-gray-600 px-2">
              Age helps us suggest gifts that are appropriate and appealing for your{' '}
              <span className="font-semibold text-purple-600 capitalize">{recipientType}</span>.
            </p>
          </div>

          {/* Age Group Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
            {ageGroupOptions.map((age) => (
              <button
                key={age.value}
                onClick={() => setSelectedAge(age.value)}
                className={`p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl border-2 transition-all transform hover:scale-105 text-left ${
                  selectedAge === age.value
                    ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 text-purple-700 shadow-lg'
                    : 'border-gray-200 hover:border-purple-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="text-base sm:text-lg md:text-xl font-semibold mb-1 sm:mb-2">{age.label}</div>
                <div className="text-xs sm:text-sm text-gray-600">{age.description}</div>
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
            <Link
              href="/find-gift"
              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors text-sm sm:text-base"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>

            <button
              onClick={handleNext}
              disabled={!selectedAge}
              className={`flex items-center px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all transform w-full sm:w-auto justify-center ${
                selectedAge
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
            Not sure about the exact age? Choose the closest range - it's just to help us narrow down the options.
          </p>
        </div>
      </div>
    </div>
  );
}
