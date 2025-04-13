
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { restaurants } from '@/data/mockData';
import RestaurantCard from './RestaurantCard';
import CategoryFilter from './CategoryFilter';
import { Layers } from 'lucide-react';

interface RestaurantListProps {
  initialSearchQuery?: string;
}

const RestaurantList: React.FC<RestaurantListProps> = ({ initialSearchQuery = '' }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants);

  // This would fetch from Supabase in a real implementation
  const { data: restaurantData } = useQuery({
    queryKey: ['restaurants'],
    initialData: restaurants,
    queryFn: async () => {
      // In a real implementation, this would be a Supabase query
      return restaurants;
    }
  });

  useEffect(() => {
    setSearchQuery(initialSearchQuery);
  }, [initialSearchQuery]);

  useEffect(() => {
    let filtered = [...restaurantData];
    
    // Apply category filter
    if (activeCategory !== 'all') {
      filtered = filtered.filter(
        restaurant => restaurant.cuisine.toLowerCase() === activeCategory
      );
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        restaurant => 
          restaurant.name.toLowerCase().includes(query) || 
          restaurant.cuisine.toLowerCase().includes(query)
      );
    }
    
    setFilteredRestaurants(filtered);
  }, [activeCategory, searchQuery, restaurantData]);

  const handleCategorySelect = (categoryId: string) => {
    setActiveCategory(categoryId);
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <CategoryFilter 
        activeCategory={activeCategory} 
        onSelectCategory={handleCategorySelect} 
      />
      
      {filteredRestaurants.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg shadow-sm">
          <div className="flex justify-center mb-4">
            <Layers size={48} className="text-gray-300" />
          </div>
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
