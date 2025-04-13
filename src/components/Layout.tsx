
import React from 'react';
import Header from './Header';
import { Toaster } from "@/components/ui/sonner";
import { CartProvider } from '@/context/CartContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <footer className="py-8 bg-foodapp-dark text-white">
          <div className="food-app-container">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-xl mb-4">FoodFlow</h3>
                <p className="text-gray-300">Delicious food delivered to your doorstep</p>
              </div>
              <div>
                <h4 className="font-bold mb-4">About Us</h4>
                <ul className="space-y-2">
                  <li>Our Story</li>
                  <li>Blog</li>
                  <li>Careers</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">Support</h4>
                <ul className="space-y-2">
                  <li>Help Center</li>
                  <li>Safety</li>
                  <li>Terms of Service</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">Download Our App</h4>
                <div className="flex space-x-4">
                  <div className="p-2 bg-white rounded-md">
                    <span className="text-foodapp-dark">App Store</span>
                  </div>
                  <div className="p-2 bg-white rounded-md">
                    <span className="text-foodapp-dark">Google Play</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-400">
              <p>© 2025 FoodFlow. All rights reserved.</p>
            </div>
          </div>
        </footer>
        <Toaster />
      </div>
    </CartProvider>
  );
};

export default Layout;
