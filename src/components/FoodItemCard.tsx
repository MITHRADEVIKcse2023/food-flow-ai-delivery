
import React from 'react';
import { Plus } from 'lucide-react';
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

  const handleAddToCart = () => {
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
        <Button 
          size="sm" 
          onClick={handleAddToCart}
          className="bg-foodapp-primary hover:bg-foodapp-primary/90 text-white rounded-full h-8 w-8 p-0"
        >
          <Plus size={16} />
        </Button>
      </div>
    </div>
  );
};

export default FoodItemCard;
