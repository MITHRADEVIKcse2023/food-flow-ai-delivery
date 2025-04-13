
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Check, MapPin, Clock, Bike, Phone, MessageCircle } from 'lucide-react';

const orderSteps = [
  { title: "Order Confirmed", description: "Your order has been received", time: "12:45 PM" },
  { title: "Preparing", description: "The restaurant is preparing your food", time: "12:50 PM" },
  { title: "On the way", description: "Food is on the way to you", time: "1:05 PM" },
  { title: "Delivered", description: "Enjoy your meal!", time: "1:20 PM" },
];

const OrderTracking: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  
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
            
            {/* Map placeholder */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="bg-gray-200 h-64 flex items-center justify-center">
                <div className="text-center">
                  <MapPin size={32} className="mx-auto mb-2 text-foodapp-gray" />
                  <p className="text-foodapp-gray">Map view will be available here</p>
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
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-medium mb-6">Need Help?</h2>
              
              <div className="space-y-4">
                <Button variant="outline" className="w-full flex justify-center items-center gap-2">
                  <Phone size={18} />
                  <span>Call Driver</span>
                </Button>
                
                <Button variant="outline" className="w-full flex justify-center items-center gap-2">
                  <MessageCircle size={18} />
                  <span>Send Message</span>
                </Button>
                
                <Button className="w-full bg-foodapp-primary hover:bg-foodapp-primary/90">
                  Support
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderTracking;
