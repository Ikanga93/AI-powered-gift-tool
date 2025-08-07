'use client';

import { useState } from 'react';
import { Gift, Heart, Sparkles, User, DollarSign, Calendar } from 'lucide-react';
import { UserPreferences } from '../utils/giftRecommendationEngine';
import { interestOptions, recipientTypeOptions, ageGroupOptions } from '../data/giftData';

interface GiftRecommendationFormProps {
  onSubmit: (preferences: UserPreferences) => void;
  isLoading: boolean;
}

export default function GiftRecommendationForm({ onSubmit, isLoading }: GiftRecommendationFormProps) {
  const [preferences, setPreferences] = useState<UserPreferences>({
    recipientType: '',
    ageGroup: '',
    interests: [],
    budget: 100,
    occasion: ''
  });

  const handleInterestToggle = (interest: string) => {
    setPreferences(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (preferences.recipientType && preferences.ageGroup) {
      onSubmit(preferences);
    }
  };

  const isFormValid = preferences.recipientType && preferences.ageGroup;

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-3 rounded-full">
            <Gift className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Gift Finder</h1>
        <p className="text-gray-600">Tell us about the recipient and we'll find the perfect gift!</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Recipient Type */}
        <div>
          <label className="flex items-center text-lg font-semibold text-gray-700 mb-3">
            <User className="w-5 h-5 mr-2" />
            Who is this gift for?
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {recipientTypeOptions.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setPreferences(prev => ({ ...prev, recipientType: type }))}
                className={`p-3 rounded-lg border-2 transition-all capitalize ${
                  preferences.recipientType === type
                    ? 'border-purple-500 bg-purple-50 text-purple-700'
                    : 'border-gray-200 hover:border-purple-300 text-gray-700'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Age Group */}
        <div>
          <label className="flex items-center text-lg font-semibold text-gray-700 mb-3">
            <Calendar className="w-5 h-5 mr-2" />
            What's their age group?
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {ageGroupOptions.map((age) => (
              <button
                key={age.value}
                type="button"
                onClick={() => setPreferences(prev => ({ ...prev, ageGroup: age.value }))}
                className={`p-3 rounded-lg border-2 transition-all ${
                  preferences.ageGroup === age.value
                    ? 'border-purple-500 bg-purple-50 text-purple-700'
                    : 'border-gray-200 hover:border-purple-300 text-gray-700'
                }`}
              >
                {age.label}
              </button>
            ))}
          </div>
        </div>

        {/* Interests */}
        <div>
          <label className="flex items-center text-lg font-semibold text-gray-700 mb-3">
            <Heart className="w-5 h-5 mr-2" />
            What are they interested in? (Select all that apply)
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-h-48 overflow-y-auto">
            {interestOptions.map((interest) => (
              <button
                key={interest}
                type="button"
                onClick={() => handleInterestToggle(interest)}
                className={`p-2 rounded-lg border text-sm transition-all capitalize ${
                  preferences.interests.includes(interest)
                    ? 'border-purple-500 bg-purple-50 text-purple-700'
                    : 'border-gray-200 hover:border-purple-300 text-gray-600'
                }`}
              >
                {interest.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Budget */}
        <div>
          <label className="flex items-center text-lg font-semibold text-gray-700 mb-3">
            <DollarSign className="w-5 h-5 mr-2" />
            What's your budget?
          </label>
          <div className="space-y-3">
            <input
              type="range"
              min="10"
              max="500"
              step="10"
              value={preferences.budget}
              onChange={(e) => setPreferences(prev => ({ ...prev, budget: parseInt(e.target.value) }))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="text-center">
              <span className="text-2xl font-bold text-purple-600">${preferences.budget}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>$10</span>
              <span>$500</span>
            </div>
          </div>
        </div>

        {/* Occasion (Optional) */}
        <div>
          <label className="flex items-center text-lg font-semibold text-gray-700 mb-3">
            <Sparkles className="w-5 h-5 mr-2" />
            Special occasion? (Optional)
          </label>
          <input
            type="text"
            placeholder="e.g., Birthday, Anniversary, Christmas..."
            value={preferences.occasion}
            onChange={(e) => setPreferences(prev => ({ ...prev, occasion: e.target.value }))}
            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isFormValid || isLoading}
          className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all ${
            isFormValid && !isLoading
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transform hover:scale-105'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="loading-spinner mr-3"></div>
              Finding Perfect Gifts...
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <Sparkles className="w-5 h-5 mr-2" />
              Get AI Recommendations
            </div>
          )}
        </button>
      </form>
    </div>
  );
}
