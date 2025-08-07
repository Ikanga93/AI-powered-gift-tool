'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, ArrowRight, ArrowLeft } from 'lucide-react';
import { recipientTypeOptions } from '../data/giftData';

export default function FindGiftPage() {
  const [selectedRecipient, setSelectedRecipient] = useState('');
  const router = useRouter();

  const handleNext = () => {
    if (selectedRecipient) {
      // Store in sessionStorage to persist across pages
      sessionStorage.setItem('giftPreferences', JSON.stringify({ recipientType: selectedRecipient }));
      router.push('/find-gift/age');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="text-sm text-gray-600">Step 1 of 4</div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{ width: '25%' }}></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-full w-20 h-20 mx-auto mb-6">
              <User className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Who is this gift for?
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tell us about your relationship with the recipient so we can suggest the most appropriate gifts.
            </p>
          </div>

          {/* Recipient Options */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            {recipientTypeOptions.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedRecipient(type)}
                className={`p-6 rounded-2xl border-2 transition-all transform hover:scale-105 ${
                  selectedRecipient === type
                    ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 text-purple-700 shadow-lg'
                    : 'border-gray-200 hover:border-purple-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="text-lg font-semibold capitalize">{type}</div>
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Link
              href="/"
              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>

            <button
              onClick={handleNext}
              disabled={!selectedRecipient}
              className={`flex items-center px-8 py-4 rounded-full font-semibold text-lg transition-all transform ${
                selectedRecipient
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
            Don't see your relationship? Choose the closest option - our AI will still find great gifts!
          </p>
        </div>
      </div>
    </div>
  );
}
