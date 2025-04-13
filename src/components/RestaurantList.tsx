
import React, { useState, useEffect } from 'react';
import { restaurants } from '@/data/mockData';
import RestaurantCard from './RestaurantCard';
import CategoryFilter from './CategoryFilter';

const RestaurantList: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants);

  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredRestaurants(restaurants);
    } else {
      const filtered = restaurants.filter(
        restaurant => restaurant.cuisine.toLowerCase() === activeCategory
      );
      setFilteredRestaurants(filtered);
    }
  }, [activeCategory]);

  const handleCategorySelect = (categoryId: string) => {
    setActiveCategory(categoryId);
  };

  return (
    <div className="bg-gray-50">
      <CategoryFilter 
        activeCategory={activeCategory} 
        onSelectCategory={handleCategorySelect} 
      />
      
      {filteredRestaurants.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg shadow-sm">
          <h3 className="text-lg font-medium">No restaurants found</h3>
          <p className="text-foodapp-gray mt-2">Try another category or check back later</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.map(restaurant => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RestaurantList;
