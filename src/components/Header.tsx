
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Menu, X, MapPin, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import CartDrawer from './CartDrawer';
import { useAuth } from '@/context/AuthContext';
import NotificationsMenu from './NotificationsMenu';
import { toast } from 'sonner';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart } = useCart();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleSignOut = async () => {
    await signOut();
    toast.success('Signed out successfully');
    navigate('/login');
  };

  const handleSignIn = () => {
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="food-app-container">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-foodapp-primary">Food<span className="text-foodapp-secondary">Flow</span></span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center text-sm text-foodapp-gray">
              <MapPin size={18} className="mr-1" />
              <span>123 Main St, City</span>
            </div>
            <nav className="ml-8">
              <ul className="flex space-x-8">
                <li>
                  <Link to="/" className="text-foodapp-dark hover:text-foodapp-primary">Home</Link>
                </li>
                <li>
                  <Link to="/restaurants" className="text-foodapp-dark hover:text-foodapp-primary">Restaurants</Link>
                </li>
                <li>
                  <Link to="/orders" className="text-foodapp-dark hover:text-foodapp-primary">Orders</Link>
                </li>
                <li>
                  <Link to="/quick-links" className="text-foodapp-dark hover:text-foodapp-primary">Quick Links</Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {user && <NotificationsMenu />}
            
            <Button 
              variant="outline" 
              size="sm" 
              className="hidden md:flex items-center gap-2"
              onClick={toggleCart}
            >
              <ShoppingBag size={18} />
              Cart {totalItems > 0 && <span className="bg-foodapp-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">{totalItems}</span>}
            </Button>

            {user ? (
              <Button
                variant="default"
                size="sm"
                onClick={handleSignOut}
                className="hidden md:flex items-center gap-2 bg-foodapp-primary hover:bg-foodapp-primary/90"
              >
                <LogOut size={16} />
                Sign Out
              </Button>
            ) : (
              <Button
                variant="default"
                size="sm"
                onClick={handleSignIn}
                className="hidden md:flex bg-foodapp-primary hover:bg-foodapp-primary/90"
              >
                Sign In
              </Button>
            )}

            <button
              onClick={toggleCart}
              className="md:hidden relative"
            >
              <ShoppingBag size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-foodapp-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {totalItems}
                </span>
              )}
            </button>

            <button
              onClick={toggleMenu}
              className="md:hidden"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white px-4 pt-2 pb-4 space-y-3">
          <div className="flex items-center text-sm text-foodapp-gray mb-2">
            <MapPin size={18} className="mr-1" />
            <span>123 Main St, City</span>
          </div>
          <Link to="/" className="block py-2 text-foodapp-dark" onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
          <Link to="/restaurants" className="block py-2 text-foodapp-dark" onClick={() => setIsMenuOpen(false)}>
            Restaurants
          </Link>
          <Link to="/orders" className="block py-2 text-foodapp-dark" onClick={() => setIsMenuOpen(false)}>
            Orders
          </Link>
          <Link to="/quick-links" className="block py-2 text-foodapp-dark" onClick={() => setIsMenuOpen(false)}>
            Quick Links
          </Link>
          {user ? (
            <Button
              variant="default"
              size="sm"
              onClick={handleSignOut}
              className="w-full mt-4 bg-foodapp-primary hover:bg-foodapp-primary/90"
            >
              Sign Out
            </Button>
          ) : (
            <Button
              variant="default"
              size="sm"
              onClick={handleSignIn}
              className="w-full mt-4 bg-foodapp-primary hover:bg-foodapp-primary/90"
            >
              Sign In
            </Button>
          )}
        </div>
      )}
      
      {/* Cart drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
};

export default Header;
