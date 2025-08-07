'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Package, Truck, Calendar, Mail, ArrowRight, Gift, Star, Home } from 'lucide-react';

interface CompletedOrder {
  gift: any;
  quantity: number;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  reasoning: string;
  customerInfo: any;
  orderNumber: string;
  orderDate: string;
  estimatedDelivery: string;
}

export default function ConfirmationPage() {
  const [orderData, setOrderData] = useState<CompletedOrder | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Get completed order from sessionStorage
    const stored = sessionStorage.getItem('completedOrder');
    if (stored) {
      const data = JSON.parse(stored);
      setOrderData(data);
      setIsLoading(false);
      
      // Clear all checkout data
      sessionStorage.removeItem('selectedGift');
      sessionStorage.removeItem('orderData');
      sessionStorage.removeItem('completedOrder');
    } else {
      // Redirect back if no order data
      router.push('/find-gift');
    }
  }, [router]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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

  if (isLoading || !orderData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner mx-auto mb-4"></div>
          <p className="text-gray-600">Loading order confirmation...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="bg-green-500 p-4 md:p-6 rounded-full w-16 h-16 md:w-24 md:h-24 mx-auto mb-4 md:mb-6 animate-bounce">
            <CheckCircle className="w-8 h-8 md:w-12 md:h-12 text-white mx-auto" />
          </div>
          
          {/* Payment Success Message */}
          <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-4 md:p-6 mb-6 mx-4">
            <div className="text-green-600 font-bold text-lg md:text-xl mb-2">
              💳 Payment Successful!
            </div>
            <div className="text-green-700 text-sm md:text-base">
              Your payment of <span className="font-bold">${orderData.total.toFixed(2)}</span> has been processed successfully.
            </div>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 px-4">
            Order Confirmed! 🎉
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-4 px-4">
            Thank you for your purchase! Your perfect gift is on its way.
          </p>
          <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 inline-block mx-4">
            <div className="text-sm text-gray-600 mb-1">Order Number</div>
            <div className="text-xl md:text-2xl font-bold text-purple-600">#{orderData.orderNumber}</div>
          </div>
        </div>

        {/* Order Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12 px-4">
          {/* Gift Details */}
          <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Gift className="w-6 h-6 mr-3 text-purple-500" />
              Your Perfect Gift
            </h2>
            
            <div className="border border-gray-200 rounded-2xl p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                  AI Recommended
                </div>
                <div className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs font-semibold">
                  Perfect Match!
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {orderData.gift.name}
              </h3>
              
              <p className="text-gray-600 mb-4">
                {orderData.gift.description}
              </p>

              {/* Star Rating */}
              <div className="flex items-center mb-4">
                <div className="flex mr-2">
                  {getScoreStars(95)} {/* Assuming high score for purchased item */}
                </div>
                <span className="text-sm text-gray-500">
                  Excellent compatibility match
                </span>
              </div>

              {/* AI Reasoning */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg mb-4">
                <h4 className="font-semibold text-gray-800 mb-2 text-sm">
                  🤖 Why This Was Perfect:
                </h4>
                <p className="text-sm text-gray-700">
                  {orderData.reasoning}
                </p>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-sm text-purple-600 font-medium">
                  Quantity: {orderData.quantity}
                </div>
                <div className="text-xl font-bold text-green-600">
                  ${orderData.gift.price}
                </div>
              </div>
            </div>
          </div>

          {/* Shipping & Delivery */}
          <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Truck className="w-6 h-6 mr-3 text-purple-500" />
              Shipping & Delivery
            </h2>

            {/* Delivery Timeline */}
            <div className="space-y-6">
              <div className="flex items-center">
                <div className="bg-green-500 rounded-full p-2 mr-4">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Order Confirmed</div>
                  <div className="text-sm text-gray-600">{formatDate(orderData.orderDate)}</div>
                </div>
              </div>

              <div className="flex items-center">
                <div className="bg-blue-500 rounded-full p-2 mr-4">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Processing</div>
                  <div className="text-sm text-gray-600">1-2 business days</div>
                </div>
              </div>

              <div className="flex items-center">
                <div className="bg-purple-500 rounded-full p-2 mr-4">
                  <Truck className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Shipped</div>
                  <div className="text-sm text-gray-600">3-5 business days</div>
                </div>
              </div>

              <div className="flex items-center">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-2 mr-4">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Estimated Delivery</div>
                  <div className="text-sm text-purple-600 font-semibold">
                    {formatDate(orderData.estimatedDelivery)}
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="mt-8 p-4 bg-gray-50 rounded-xl">
              <h3 className="font-semibold text-gray-900 mb-2">Shipping to:</h3>
              <div className="text-sm text-gray-600">
                <div>{orderData.customerInfo.firstName} {orderData.customerInfo.lastName}</div>
                <div>{orderData.customerInfo.address}</div>
                <div>{orderData.customerInfo.city}, {orderData.customerInfo.state} {orderData.customerInfo.zipCode}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl p-6 md:p-8 mb-8 md:mb-12 mx-4">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal ({orderData.quantity} item{orderData.quantity > 1 ? 's' : ''}):</span>
                <span className="font-semibold">${orderData.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax:</span>
                <span className="font-semibold">${orderData.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping:</span>
                <span className="font-semibold">
                  {orderData.shipping === 0 ? (
                    <span className="text-green-600">FREE</span>
                  ) : (
                    `$${orderData.shipping.toFixed(2)}`
                  )}
                </span>
              </div>
              <hr className="border-gray-200" />
              <div className="flex justify-between text-xl font-bold">
                <span>Total Paid:</span>
                <span className="text-purple-600">${orderData.total.toFixed(2)}</span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl">
              <h3 className="font-semibold text-gray-900 mb-3">What's Next?</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-purple-500" />
                  You'll receive email updates about your order
                </li>
                <li className="flex items-center">
                  <Package className="w-4 h-4 mr-2 text-purple-500" />
                  We'll send tracking info once shipped
                </li>
                <li className="flex items-center">
                  <Gift className="w-4 h-4 mr-2 text-purple-500" />
                  Your gift will arrive beautifully packaged
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="text-center space-y-4 px-4">
          {/* Primary Start Over Button */}
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 md:p-8 mb-6">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
              Want to Find More Perfect Gifts?
            </h3>
            <p className="text-gray-600 mb-6 text-sm md:text-base">
              Our AI is ready to help you find more amazing gifts for your loved ones!
            </p>
            <Link
              href="/find-gift"
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold text-base md:text-lg hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg inline-flex items-center justify-center w-full sm:w-auto"
            >
              <Gift className="w-5 h-5 mr-2" />
              🎯 Start Over - Find Another Gift
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
          
          {/* Secondary Actions */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center max-w-md mx-auto">
            <Link
              href="/"
              className="border-2 border-purple-500 text-purple-600 px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold text-sm md:text-base hover:bg-purple-500 hover:text-white transition-all inline-flex items-center justify-center flex-1"
            >
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            
            <Link
              href="/about"
              className="border-2 border-gray-300 text-gray-600 px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold text-sm md:text-base hover:bg-gray-100 transition-all inline-flex items-center justify-center flex-1"
            >
              Learn More
            </Link>
          </div>

          {/* Thank You Message */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mt-8 mx-4">
            <div className="text-2xl mb-3">🎉✨💝</div>
            <p className="text-gray-700 font-medium mb-2">
              Thank you for choosing GiftGenius!
            </p>
            <p className="text-gray-600 text-sm md:text-base">
              We hope your recipient loves their perfect gift. Happy gift-giving!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
