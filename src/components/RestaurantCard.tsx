
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, DollarSign } from 'lucide-react';
import { Restaurant } from '@/data/mockData';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  return (
    <Link to={`/restaurant/${restaurant.id}`} className="restaurant-card block">
      <div className="relative">
        <img 
          src={restaurant.image} 
          alt={restaurant.name}
          className="w-full h-48 object-cover"
        />
        {restaurant.featured && (
          <span className="absolute top-4 left-4 bg-foodapp-primary text-white px-2 py-1 text-xs font-semibold rounded-md">
            Featured
          </span>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg">{restaurant.name}</h3>
          <div className="flex items-center">
            <Star size={16} className="text-yellow-400 fill-yellow-400" />
            <span className="ml-1 text-sm font-medium">{restaurant.rating}</span>
          </div>
        </div>
        <p className="text-foodapp-gray text-sm mt-1">{restaurant.cuisine}</p>
        <div className="flex justify-between mt-3">
          <div className="flex items-center text-sm text-foodapp-gray">
            <Clock size={14} className="mr-1" />
            <span>{restaurant.deliveryTime}</span>
          </div>
          <div className="flex items-center text-sm text-foodapp-gray">
            <DollarSign size={14} className="mr-1" />
            <span>{restaurant.deliveryFee}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;
