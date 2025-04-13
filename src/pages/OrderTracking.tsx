
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Check, MapPin, Clock, Bike, Phone, MessageCircle } from 'lucide-react';
import OrderMap from '@/components/OrderMap';
import ChatInterface from '@/components/ChatInterface';

const orderSteps = [
  { title: "Order Confirmed", description: "Your order has been received", time: "12:45 PM" },
  { title: "Preparing", description: "The restaurant is preparing your food", time: "12:50 PM" },
  { title: "On the way", description: "Food is on the way to you", time: "1:05 PM" },
  { title: "Delivered", description: "Enjoy your meal!", time: "1:20 PM" },
];

const OrderTracking: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showChat, setShowChat] = useState(false);
  
  // Simulates order progress
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentStep < orderSteps.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    }, 10000); // Advance to next step every 10 seconds
    
    return () => clearTimeout(timer);
  }, [currentStep]);

  return (
    <Layout>
      <div className="food-app-container py-8">
        <h1 className="text-3xl font-semibold mb-8">Track Your Order</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Order tracking */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-medium">Order #12345</h2>
                <span className="text-foodapp-gray">Estimated Delivery: 1:20 PM</span>
              </div>
              
              {/* Progress steps */}
              <div className="relative">
                {orderSteps.map((step, index) => {
                  const isCompleted = index <= currentStep;
                  const isActive = index === currentStep;
                  
                  return (
                    <div key={index} className="flex mb-8 last:mb-0">
                      {/* Step indicator */}
                      <div className="relative">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                          isCompleted 
                            ? 'bg-foodapp-primary text-white' 
                            : 'bg-gray-200 text-foodapp-gray'
                        }`}>
                          {isCompleted ? <Check size={16} /> : index + 1}
                        </div>
                        
                        {/* Connecting line */}
                        {index < orderSteps.length - 1 && (
                          <div className="absolute top-8 left-4 w-0.5 h-[calc(100%-8px)] -translate-x-1/2 z-0">
                            <div className={`w-full h-full ${
                              isCompleted ? 'bg-foodapp-primary' : 'bg-gray-200'
                            }`}></div>
                          </div>
                        )}
                      </div>
                      
                      {/* Step content */}
                      <div className="ml-4 flex-grow">
                        <div className="flex justify-between">
                          <h3 className={`font-medium ${isActive ? 'text-foodapp-primary' : ''}`}>
                            {step.title}
                          </h3>
                          <span className="text-sm text-foodapp-gray">{step.time}</span>
                        </div>
                        <p className="text-sm text-foodapp-gray mt-1">{step.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Map integration */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
              <OrderMap 
                deliveryLocation={[-73.9857, 40.7484]}
                customerLocation={[-73.9712, 40.7831]}
              />
            </div>
            
            {/* Order Details */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-medium mb-6">Order Details</h2>
              <div className="divide-y">
                <div className="py-3 flex justify-between">
                  <span className="text-foodapp-gray">2× Chicken Burger</span>
                  <span>$17.98</span>
                </div>
                <div className="py-3 flex justify-between">
                  <span className="text-foodapp-gray">1× French Fries (Large)</span>
                  <span>$4.99</span>
                </div>
                <div className="py-3 flex justify-between">
                  <span className="text-foodapp-gray">1× Chocolate Milkshake</span>
                  <span>$5.49</span>
                </div>
                <div className="py-3 flex justify-between">
                  <span className="text-foodapp-gray">Subtotal</span>
                  <span>$28.46</span>
                </div>
                <div className="py-3 flex justify-between">
                  <span className="text-foodapp-gray">Delivery Fee</span>
                  <span>$2.99</span>
                </div>
                <div className="py-3 flex justify-between font-semibold">
                  <span>Total</span>
                  <span>$31.45</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right: Delivery details and contact */}
          <div>
            {/* Delivery details */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-medium mb-6">Delivery Details</h2>
              
              <div className="space-y-4">
                <div className="flex">
                  <Clock size={20} className="text-foodapp-primary mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Estimated Arrival</p>
                    <p className="text-foodapp-gray">1:20 PM (25 min)</p>
                  </div>
                </div>
                
                <div className="flex">
                  <Bike size={20} className="text-foodapp-primary mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Delivery Person</p>
                    <p className="text-foodapp-gray">Alex Johnson</p>
                  </div>
                </div>
                
                <div className="flex">
                  <MapPin size={20} className="text-foodapp-primary mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Delivery Address</p>
                    <p className="text-foodapp-gray">123 Main St, Apt 4B, New York, NY 10001</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact options */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-medium mb-6">Need Help?</h2>
              
              <div className="space-y-4">
                <Button variant="outline" className="w-full flex justify-center items-center gap-2">
                  <Phone size={18} />
                  <span>Call Driver</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full flex justify-center items-center gap-2"
                  onClick={() => setShowChat(!showChat)}
                >
                  <MessageCircle size={18} />
                  <span>Message Driver</span>
                </Button>
                
                <Button className="w-full bg-foodapp-primary hover:bg-foodapp-primary/90">
                  Support
                </Button>
              </div>
            </div>
            
            {/* Chat Interface */}
            {showChat && (
              <div className="bg-white rounded-lg shadow-sm h-[400px]">
                <ChatInterface driverName="Alex Johnson" />
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderTracking;
