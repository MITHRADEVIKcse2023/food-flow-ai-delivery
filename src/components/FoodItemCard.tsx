
import React, { useState } from 'react';
import { Plus, Minus, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FoodItem } from '@/data/mockData';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

interface FoodItemCardProps {
  item: FoodItem;
  showRestaurantName?: boolean;
}

const FoodItemCard: React.FC<FoodItemCardProps> = ({ item, showRestaurantName }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [showQuantityControls, setShowQuantityControls] = useState(false);

  const handleAddToCart = () => {
    if (showQuantityControls) {
      // Add current quantity if controls are shown
      for (let i = 0; i < quantity; i++) {
        addToCart(item);
      }
      toast.success(`Added ${quantity} ${item.name}${quantity > 1 ? 's' : ''} to cart`);
      setQuantity(1);
      setShowQuantityControls(false);
    } else {
      // Show quantity controls on first click
      setShowQuantityControls(true);
    }
  };

  const handleQuickAdd = () => {
    addToCart(item);
    toast.success(`Added ${item.name} to cart`);
  };

  return (
    <div className="food-item-card">
      <div className="relative h-40 mb-3">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover rounded-lg"
        />
        {item.vegetarian && (
          <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded">
            Veg
          </span>
        )}
        {item.popular && (
          <span className="absolute top-2 right-2 bg-foodapp-primary text-white text-xs px-1.5 py-0.5 rounded">
            Popular
          </span>
        )}
        <Button
          size="sm"
          onClick={handleQuickAdd}
          className="absolute bottom-2 right-2 bg-white text-foodapp-primary border border-foodapp-primary hover:bg-foodapp-primary hover:text-white rounded-full h-8 w-8 p-0"
        >
          <ShoppingBag size={14} />
        </Button>
      </div>
      <div className="flex-grow">
        <h3 className="font-medium text-base">{item.name}</h3>
        {showRestaurantName && (
          <p className="text-foodapp-gray text-sm mt-1">Restaurant Name</p>
        )}
        <p className="text-foodapp-gray text-sm mt-1 line-clamp-2">{item.description}</p>
      </div>
      <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
        <span className="font-semibold">${item.price.toFixed(2)}</span>
        
        {showQuantityControls ? (
          <div className="flex items-center">
            <Button 
              size="sm" 
              variant="ghost"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="h-8 w-8 p-0"
            >
              <Minus size={16} />
            </Button>
            <span className="mx-2 w-6 text-center">{quantity}</span>
            <Button 
              size="sm" 
              variant="ghost"
              onClick={() => setQuantity(quantity + 1)}
              className="h-8 w-8 p-0"
            >
              <Plus size={16} />
            </Button>
            <Button 
              size="sm" 
              onClick={handleAddToCart}
              className="ml-2 bg-foodapp-primary hover:bg-foodapp-primary/90 text-white rounded-md px-3"
            >
              Add
            </Button>
          </div>
        ) : (
          <Button 
            size="sm" 
            onClick={handleAddToCart}
            className="bg-foodapp-primary hover:bg-foodapp-primary/90 text-white rounded-full h-8 w-8 p-0"
          >
            <Plus size={16} />
          </Button>
        )}
      </div>
    </div>
  );
};

export default FoodItemCard;
