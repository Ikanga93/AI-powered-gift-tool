import Link from 'next/link';
import { Gift, Brain, Heart, Zap, Users, Target, ArrowRight, Sparkles } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-6">
            <Gift className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              About GiftGenius
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            We believe that finding the perfect gift shouldn't be stressful. That's why we created an AI-powered 
            recommendation engine that takes the guesswork out of gift-giving.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              To make thoughtful gift-giving accessible to everyone through the power of artificial intelligence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Why We Built GiftGenius</h3>
              <div className="space-y-4 text-gray-600">
                <p>
                  Gift-giving is one of humanity's most beautiful expressions of love, friendship, and appreciation. 
                  Yet finding the right gift can be overwhelming, time-consuming, and stressful.
                </p>
                <p>
                  We created GiftGenius to solve this problem by combining the thoughtfulness of human insight 
                  with the analytical power of artificial intelligence. Our platform learns about your recipient 
                  and suggests gifts that truly resonate with their personality and interests.
                </p>
                <p>
                  Every recommendation comes with clear reasoning, so you understand why it's perfect for your 
                  special someone. No more endless browsing or second-guessing – just confident, thoughtful gift-giving.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl p-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="bg-purple-500 rounded-full p-4 w-16 h-16 mx-auto mb-3">
                    <Brain className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-purple-600">AI-Powered</div>
                  <div className="text-sm text-gray-600">Smart algorithms</div>
                </div>
                <div className="text-center">
                  <div className="bg-pink-500 rounded-full p-4 w-16 h-16 mx-auto mb-3">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-pink-600">Thoughtful</div>
                  <div className="text-sm text-gray-600">Meaningful gifts</div>
                </div>
                <div className="text-center">
                  <div className="bg-blue-500 rounded-full p-4 w-16 h-16 mx-auto mb-3">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-blue-600">Fast</div>
                  <div className="text-sm text-gray-600">Quick results</div>
                </div>
                <div className="text-center">
                  <div className="bg-green-500 rounded-full p-4 w-16 h-16 mx-auto mb-3">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-green-600">Accurate</div>
                  <div className="text-sm text-gray-600">Perfect matches</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How Our AI Works</h2>
            <p className="text-xl text-gray-600">
              Behind the scenes of our recommendation engine
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full w-12 h-12 flex items-center justify-center mb-6">
                <span className="text-xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Data Collection</h3>
              <p className="text-gray-600">
                We gather information about the recipient's age, interests, your relationship, 
                budget, and occasion to build a comprehensive profile.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="bg-gradient-to-r from-pink-500 to-blue-500 rounded-full w-12 h-12 flex items-center justify-center mb-6">
                <span className="text-xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">AI Analysis</h3>
              <p className="text-gray-600">
                Our algorithm analyzes compatibility across multiple dimensions: age appropriateness, 
                interest alignment, relationship context, and budget fit.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-full w-12 h-12 flex items-center justify-center mb-6">
                <span className="text-xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Smart Recommendations</h3>
              <p className="text-gray-600">
                We rank and present the best matches with detailed explanations, 
                so you understand exactly why each gift is perfect.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Deep Dive */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Makes Us Different</h2>
          </div>

          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Personalized Reasoning</h3>
                <p className="text-gray-600 mb-4">
                  Unlike generic gift lists, every recommendation comes with detailed reasoning 
                  explaining why it's perfect for your specific recipient.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                    Age-appropriate suggestions
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                    Interest-based matching
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                    Relationship context awareness
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                    Budget optimization
                  </li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center mb-3">
                    <div className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs font-semibold">
                      95% Match
                    </div>
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">Wireless Earbuds</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Great choice because it's perfect for young adults, 
                    matches their interest in technology and music, and fits within your budget.
                  </p>
                  <div className="text-lg font-bold text-green-600">$150</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
                  <div className="text-gray-600 mb-4">Curated Gift Options</div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="bg-white rounded-lg p-2">Tech</div>
                    <div className="bg-white rounded-lg p-2">Books</div>
                    <div className="bg-white rounded-lg p-2">Fashion</div>
                    <div className="bg-white rounded-lg p-2">Home</div>
                    <div className="bg-white rounded-lg p-2">Sports</div>
                    <div className="bg-white rounded-lg p-2">Arts</div>
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Curated Gift Database</h3>
                <p className="text-gray-600 mb-4">
                  Our team has carefully selected and categorized hundreds of gifts across 
                  multiple categories, price points, and interests to ensure quality recommendations.
                </p>
                <p className="text-gray-600">
                  From budget-friendly tokens of appreciation to luxury items for special occasions, 
                  we have options for every relationship and budget.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Give the Perfect Gift?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Join thousands of thoughtful gift-givers who trust GiftGenius for their special occasions
          </p>
          <Link
            href="/find-gift"
            className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg inline-flex items-center"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Start Finding Gifts
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
}
