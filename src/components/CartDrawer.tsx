
import React from 'react';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateCartItemQuantity, clearCart } = useCart();

  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const deliveryFee = subtotal > 0 ? 2.99 : 0;
  const total = subtotal + deliveryFee;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-foodapp-dark bg-opacity-50"
        onClick={onClose}
      ></div>
      
      {/* Cart drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-xl flex flex-col">
        <div className="p-4 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Your Cart</h2>
            <button onClick={onClose} className="p-2">
              <X size={20} />
            </button>
          </div>
        </div>
        
        <div className="flex-grow overflow-auto p-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag size={64} className="text-gray-300 mb-4" />
              <h3 className="font-medium text-lg mb-2">Your cart is empty</h3>
              <p className="text-foodapp-gray mb-6">Add items to get started</p>
              <Button onClick={onClose} className="bg-foodapp-primary hover:bg-foodapp-primary/90">
                Browse Restaurants
              </Button>
            </div>
          ) : (
            <div>
              {cart.map((item) => (
                <div key={item.id} className="flex py-4 border-b">
                  <div className="w-20 h-20 flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                  <div className="flex-grow ml-4">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-foodapp-gray text-sm">${item.price.toFixed(2)}</p>
                    <div className="flex items-center mt-2">
                      <button 
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"
                        onClick={() => updateCartItemQuantity(item.id, Math.max(1, item.quantity - 1))}
                      >
                        -
                      </button>
                      <span className="mx-3">{item.quantity}</span>
                      <button 
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"
                        onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                      <button 
                        className="ml-auto p-2 text-foodapp-gray hover:text-red-500"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {cart.length > 0 && (
          <div className="border-t p-4">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-foodapp-gray">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foodapp-gray">Delivery Fee</span>
                <span>${deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold pt-3 border-t">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              
              <Link 
                to="/checkout"
                className="btn-primary w-full text-center block"
                onClick={onClose}
              >
                Checkout
              </Link>
              
              <button 
                onClick={clearCart}
                className="text-foodapp-gray text-sm hover:text-foodapp-primary w-full mt-2"
              >
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
