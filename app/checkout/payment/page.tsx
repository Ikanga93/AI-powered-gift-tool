'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CreditCard, Lock, ArrowLeft, ArrowRight, User, MapPin, Calendar, Shield } from 'lucide-react';

interface OrderData {
  gift: any;
  quantity: number;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  reasoning: string;
}

export default function PaymentPage() {
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });
  const router = useRouter();

  useEffect(() => {
    // Get order data from sessionStorage
    const stored = sessionStorage.getItem('orderData');
    if (stored) {
      const data = JSON.parse(stored);
      setOrderData(data);
      setIsLoading(false);
    } else {
      // Redirect back if no order data
      router.push('/checkout');
    }
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Store order for confirmation page
    const finalOrder = {
      ...orderData,
      customerInfo: formData,
      orderNumber: `GG${Date.now().toString().slice(-6)}`,
      orderDate: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
    };
    
    sessionStorage.setItem('completedOrder', JSON.stringify(finalOrder));
    router.push('/checkout/confirmation');
  };

  const handleBack = () => {
    router.push('/checkout');
  };

  const isFormValid = () => {
    return formData.email && formData.firstName && formData.lastName && 
           formData.address && formData.city && formData.state && formData.zipCode &&
           formData.cardNumber && formData.expiryDate && formData.cvv && formData.nameOnCard;
  };

  if (isLoading || !orderData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner mx-auto mb-4"></div>
          <p className="text-gray-600">Loading payment details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-full w-20 h-20 mx-auto mb-6">
            <Lock className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Secure Checkout
          </h1>
          <p className="text-xl text-gray-600">
            Complete your order with our secure payment system
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Contact Information */}
              <div className="bg-white rounded-3xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <User className="w-6 h-6 mr-3 text-purple-500" />
                  Contact Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                      placeholder="John"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                      placeholder="Doe"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white rounded-3xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <MapPin className="w-6 h-6 mr-3 text-purple-500" />
                  Shipping Address
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Street Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                      placeholder="123 Main Street"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                      placeholder="New York"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                      placeholder="NY"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                      placeholder="10001"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-white rounded-3xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <CreditCard className="w-6 h-6 mr-3 text-purple-500" />
                  Payment Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                      placeholder="1234 5678 9012 3456"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                      placeholder="MM/YY"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                      placeholder="123"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Name on Card
                    </label>
                    <input
                      type="text"
                      name="nameOnCard"
                      value={formData.nameOnCard}
                      onChange={handleInputChange}
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                </div>

                {/* Security Notice */}
                <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-4">
                  <div className="flex items-center text-green-700">
                    <Shield className="w-5 h-5 mr-2" />
                    <span className="text-sm font-semibold">
                      Your payment information is encrypted and secure
                    </span>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-xl p-8 sticky top-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              {/* Gift Details */}
              <div className="border border-gray-200 rounded-xl p-4 mb-6">
                <h3 className="font-bold text-gray-900 mb-2">{orderData.gift.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{orderData.gift.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Qty: {orderData.quantity}</span>
                  <span className="font-semibold">${orderData.gift.price}</span>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
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
                  <span>Total:</span>
                  <span className="text-purple-600">${orderData.total.toFixed(2)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <button
                  type="submit"
                  form="payment-form"
                  onClick={handleSubmit}
                  disabled={!isFormValid() || isProcessing}
                  className={`w-full py-4 px-6 rounded-2xl font-semibold text-lg transition-all transform shadow-lg flex items-center justify-center ${
                    isFormValid() && !isProcessing
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 hover:scale-105'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {isProcessing ? (
                    <>
                      <div className="loading-spinner mr-3"></div>
                      Processing Payment...
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5 mr-2" />
                      Complete Order
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </button>

                <button
                  onClick={handleBack}
                  disabled={isProcessing}
                  className="w-full border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-2xl font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Cart
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-2">100% Secure Checkout</div>
                  <div className="flex justify-center space-x-2 text-xs text-gray-500">
                    <span>🔒 256-bit SSL</span>
                    <span>•</span>
                    <span>💳 PCI Compliant</span>
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
