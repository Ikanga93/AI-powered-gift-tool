'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingCart, CreditCard, ArrowRight, ArrowLeft, Star, DollarSign, Gift } from 'lucide-react';
import { RecommendationResult } from '../utils/giftRecommendationEngine';

export default function CheckoutPage() {
  const [selectedGift, setSelectedGift] = useState<RecommendationResult | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Get selected gift from sessionStorage
    const stored = sessionStorage.getItem('selectedGift');
    if (stored) {
      const giftData = JSON.parse(stored);
      setSelectedGift(giftData);
      setIsLoading(false);
    } else {
      // Redirect back if no gift selected
      router.push('/find-gift/results');
    }
  }, [router]);

  const handleProceedToPayment = () => {
    // Store order details for payment page
    const subtotalAmount = selectedGift ? selectedGift.gift.price * quantity : 0;
    const taxAmount = selectedGift ? Math.round(selectedGift.gift.price * quantity * 0.08 * 100) / 100 : 0;
    const shippingAmount = selectedGift && selectedGift.gift.price * quantity > 50 ? 0 : 9.99;
    const totalAmount = subtotalAmount + taxAmount + shippingAmount;
    
    const orderData = {
      gift: selectedGift?.gift,
      quantity,
      subtotal: subtotalAmount,
      tax: taxAmount,
      shipping: shippingAmount,
      total: totalAmount,
      reasoning: selectedGift?.reasoning
    };
    
    sessionStorage.setItem('orderData', JSON.stringify(orderData));
    router.push('/checkout/payment');
  };

  const handleBack = () => {
    router.push('/find-gift/results');
  };

  const getScoreStars = (score: number) => {
    const stars = Math.round((score / 100) * 5);
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < stars ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  if (isLoading || !selectedGift) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your selected gift...</p>
        </div>
      </div>
    );
  }

  const subtotal = selectedGift.gift.price * quantity;
  const tax = Math.round(subtotal * 0.08 * 100) / 100;
  const shipping = subtotal > 50 ? 0 : 9.99;
  const total = subtotal + tax + shipping;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-8 md:py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 md:p-4 rounded-full w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 md:mb-6">
            <ShoppingCart className="w-10 h-10 md:w-12 md:h-12 text-white" />
          </div>
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4 px-4">
            Review Your Perfect Gift
          </h1>
          <p className="text-lg md:text-xl text-gray-600 px-4">
            You're one step closer to giving the perfect gift!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Gift Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">Selected Gift</h2>
              
              <div className="border border-gray-200 rounded-xl md:rounded-2xl p-4 md:p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-4">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs md:text-sm font-bold px-2 md:px-3 py-1 rounded-full">
                    AI Recommended
                  </div>
                  <div className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs font-semibold">
                    {Math.round(selectedGift.score)}% Match
                  </div>
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                  {selectedGift.gift.name}
                </h3>
                
                <p className="text-gray-600 mb-4">
                  {selectedGift.gift.description}
                </p>

                {/* Star Rating */}
                <div className="flex items-center mb-4">
                  <div className="flex mr-2">
                    {getScoreStars(selectedGift.score)}
                  </div>
                  <span className="text-sm text-gray-500">
                    ({Math.round(selectedGift.score)}/100 compatibility)
                  </span>
                </div>

                {/* AI Reasoning */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2 text-sm flex items-center">
                    <Gift className="w-4 h-4 mr-2" />
                    Why This is Perfect:
                  </h4>
                  <p className="text-sm text-gray-700">
                    {selectedGift.reasoning}
                  </p>
                </div>

                {/* Category & Price */}
                <div className="flex justify-between items-center mb-6">
                  <div className="text-sm text-purple-600 font-medium">
                    {selectedGift.gift.category}
                  </div>
                  <div className="text-2xl font-bold text-green-600">
                    ${selectedGift.gift.price}
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <span className="text-base md:text-lg font-semibold text-gray-700">Quantity:</span>
                  <div className="flex items-center space-x-3 md:space-x-4 justify-center sm:justify-end">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white transition-colors flex items-center justify-center font-bold text-sm md:text-base"
                    >
                      -
                    </button>
                    <span className="text-lg md:text-xl font-bold text-gray-900 w-6 md:w-8 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white transition-colors flex items-center justify-center font-bold text-sm md:text-base"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl p-6 md:p-8 lg:sticky lg:top-8">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">Order Summary</h2>
              
              <div className="space-y-3 md:space-y-4 mb-6">
                <div className="flex justify-between text-sm md:text-base">
                  <span className="text-gray-600">Subtotal ({quantity} item{quantity > 1 ? 's' : ''}):</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm md:text-base">
                  <span className="text-gray-600">Tax:</span>
                  <span className="font-semibold">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm md:text-base">
                  <span className="text-gray-600">Shipping:</span>
                  <span className="font-semibold">
                    {shipping === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                {shipping === 0 && (
                  <div className="text-xs text-green-600">
                    🎉 Free shipping on orders over $50!
                  </div>
                )}
                <hr className="border-gray-200" />
                <div className="flex justify-between text-lg md:text-xl font-bold">
                  <span>Total:</span>
                  <span className="text-purple-600">${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-3 md:space-y-4">
                <button
                  onClick={handleProceedToPayment}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 md:py-4 px-4 md:px-6 rounded-xl md:rounded-2xl font-semibold text-base md:text-lg hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center"
                >
                  <CreditCard className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                  Proceed to Payment
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
                </button>

                <button
                  onClick={handleBack}
                  className="w-full border-2 border-gray-300 text-gray-700 py-2 md:py-3 px-4 md:px-6 rounded-xl md:rounded-2xl font-semibold text-sm md:text-base hover:bg-gray-50 transition-colors flex items-center justify-center"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Recommendations
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-2">Secure Checkout</div>
                  <div className="flex justify-center space-x-2 text-xs text-gray-500">
                    <span>🔒 SSL Encrypted</span>
                    <span>•</span>
                    <span>💳 Safe Payment</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
