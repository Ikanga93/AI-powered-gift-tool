import Link from 'next/link';
import { Gift, Sparkles, Heart, Zap, Target, Clock, ArrowRight, Star, Users, TrendingUp } from 'lucide-react';

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 min-h-screen">
      {/* Hero Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-6 sm:mb-8">
            <div className="inline-flex items-center justify-center p-3 sm:p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4 sm:mb-6">
              <Gift className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 px-2">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                GiftGenius
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-4">
              Discover the perfect gift with our AI-powered recommendation engine. 
              Personalized suggestions based on recipient preferences, interests, and your budget.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12 px-4">
            <Link
              href="/find-gift"
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center"
            >
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Start Finding Gifts
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
            </Link>
            <Link
              href="/about"
              className="border-2 border-purple-500 text-purple-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:bg-purple-500 hover:text-white transition-all flex items-center justify-center"
            >
              Learn More
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto px-4">
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg">
              <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-1 sm:mb-2">10K+</div>
              <div className="text-sm sm:text-base text-gray-600">Happy Gift Givers</div>
            </div>
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg">
              <div className="text-2xl sm:text-3xl font-bold text-pink-600 mb-1 sm:mb-2">95%</div>
              <div className="text-sm sm:text-base text-gray-600">Satisfaction Rate</div>
            </div>
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg">
              <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1 sm:mb-2">500+</div>
              <div className="text-sm sm:text-base text-gray-600">Gift Categories</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-2">
              Why Choose GiftGenius?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Our AI-powered platform makes gift-giving effortless and meaningful
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 text-center">
              <div className="bg-purple-500 rounded-full p-3 sm:p-4 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-3 sm:mb-4">
                <Zap className="w-6 h-6 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">AI-Powered</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Advanced algorithms analyze preferences to suggest the most thoughtful gifts
              </p>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-blue-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 text-center">
              <div className="bg-pink-500 rounded-full p-3 sm:p-4 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-3 sm:mb-4">
                <Target className="w-6 h-6 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Personalized</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Every recommendation is tailored to the recipient's age, interests, and your relationship
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 text-center">
              <div className="bg-blue-500 rounded-full p-3 sm:p-4 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-3 sm:mb-4">
                <Clock className="w-6 h-6 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Quick & Easy</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Get perfect gift suggestions in under 2 minutes with our simple questionnaire
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 text-center">
              <div className="bg-green-500 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Thoughtful</h3>
              <p className="text-gray-600">
                Each suggestion comes with reasoning to help you understand why it's perfect
              </p>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-pink-50 rounded-2xl p-8 text-center">
              <div className="bg-yellow-500 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">All Occasions</h3>
              <p className="text-gray-600">
                Birthdays, holidays, anniversaries - we've got the perfect gift for every occasion
              </p>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 text-center">
              <div className="bg-indigo-500 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Budget Friendly</h3>
              <p className="text-gray-600">
                Find amazing gifts within any budget range, from $10 to $500+
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Three simple steps to find the perfect gift
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Tell Us About Them</h3>
              <p className="text-gray-600">
                Share details about the recipient - their age, interests, and your relationship with them
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-r from-pink-500 to-blue-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">AI Analyzes</h3>
              <p className="text-gray-600">
                Our advanced AI processes your input and matches it with our curated gift database
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Get Perfect Matches</h3>
              <p className="text-gray-600">
                Receive personalized gift recommendations with explanations for each suggestion
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Find the Perfect Gift?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Join thousands of happy gift-givers who trust GiftGenius for their special occasions
          </p>
          <Link
            href="/find-gift"
            className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg inline-flex items-center"
          >
            <Gift className="w-5 h-5 mr-2" />
            Start Your Gift Journey
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
}
