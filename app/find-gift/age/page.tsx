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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="text-sm text-gray-600">Step 2 of 4</div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{ width: '50%' }}></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-full w-20 h-20 mx-auto mb-6">
              <Calendar className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              What's their age group?
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Age helps us suggest gifts that are appropriate and appealing for your{' '}
              <span className="font-semibold text-purple-600 capitalize">{recipientType}</span>.
            </p>
          </div>

          {/* Age Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {ageGroupOptions.map((age) => (
              <button
                key={age.value}
                onClick={() => setSelectedAge(age.value)}
                className={`p-8 rounded-2xl border-2 transition-all transform hover:scale-105 text-left ${
                  selectedAge === age.value
                    ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 text-purple-700 shadow-lg'
                    : 'border-gray-200 hover:border-purple-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="text-2xl font-bold mb-2">{age.label}</div>
                <div className="text-sm opacity-75">
                  {age.value === 'child' && 'Toys, games, educational items'}
                  {age.value === 'teen' && 'Tech, fashion, hobby items'}
                  {age.value === 'young-adult' && 'Lifestyle, career, experiences'}
                  {age.value === 'adult' && 'Home, wellness, professional'}
                  {age.value === 'senior' && 'Comfort, health, memories'}
                </div>
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
              disabled={!selectedAge}
              className={`flex items-center px-8 py-4 rounded-full font-semibold text-lg transition-all transform ${
                selectedAge
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 hover:scale-105 shadow-lg'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Continue
              <ArrowRight className="w-5 h-5 ml-2" />
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
