
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Star, Clock, DollarSign, MapPin } from 'lucide-react';
import { restaurants, foodItems, FoodItem } from '@/data/mockData';
import FoodItemCard from '@/components/FoodItemCard';

const RestaurantMenu: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [restaurant, setRestaurant] = useState(restaurants[0]);
  const [menuItems, setMenuItems] = useState<FoodItem[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Group menu items by category
  const itemsByCategory = menuItems.reduce<Record<string, FoodItem[]>>(
    (acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    },
    {}
  );

  const categories = Object.keys(itemsByCategory);
  
  useEffect(() => {
    if (id) {
      // Find restaurant
      const foundRestaurant = restaurants.find(r => r.id === id);
      if (foundRestaurant) {
        setRestaurant(foundRestaurant);
        
        // Find menu items for this restaurant
        const items = foodItems.filter(item => item.restaurantId === id);
        setMenuItems(items);
      }
    }
  }, [id]);

  return (
    <Layout>
      <div>
        {/* Restaurant Hero */}
        <div className="relative h-64 md:h-80">
          <img 
            src={restaurant.image} 
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        </div>
        
        {/* Restaurant Info */}
        <div className="food-app-container -mt-16 relative z-10">
          <div className="bg-white rounded-t-2xl p-6 shadow-lg">
            <h1 className="text-3xl font-bold">{restaurant.name}</h1>
            <div className="flex flex-wrap items-center gap-4 mt-2 text-foodapp-gray">
              <div className="flex items-center">
                <Star size={16} className="text-yellow-400 fill-yellow-400 mr-1" />
                <span>{restaurant.rating}</span>
              </div>
              <div className="flex items-center">
                <MapPin size={16} className="mr-1" />
                <span>{restaurant.cuisine}</span>
              </div>
              <div className="flex items-center">
                <Clock size={16} className="mr-1" />
                <span>{restaurant.deliveryTime}</span>
              </div>
              <div className="flex items-center">
                <DollarSign size={16} className="mr-1" />
                <span>{restaurant.deliveryFee} delivery</span>
              </div>
            </div>
            
            {/* Categories navbar */}
            <div className="mt-8 border-b">
              <div className="flex space-x-6 overflow-x-auto py-2">
                <button
                  className={`text-base pb-2 px-1 font-medium whitespace-nowrap ${
                    activeCategory === 'all' 
                      ? 'text-foodapp-primary border-b-2 border-foodapp-primary' 
                      : 'text-foodapp-gray'
                  }`}
                  onClick={() => setActiveCategory('all')}
                >
                  All Items
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`text-base pb-2 px-1 font-medium whitespace-nowrap ${
                      activeCategory === category 
                        ? 'text-foodapp-primary border-b-2 border-foodapp-primary' 
                        : 'text-foodapp-gray'
                    }`}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Menu Items */}
        <div className="food-app-container py-8">
          {activeCategory === 'all' ? (
            // When "All Items" is selected, show all categories
            <>
              {categories.map((category) => (
                <div key={category} className="mb-10">
                  <h2 className="text-xl font-semibold mb-4">{category}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {itemsByCategory[category].map((item) => (
                      <FoodItemCard key={item.id} item={item} />
                    ))}
                  </div>
                </div>
              ))}
            </>
          ) : (
            // When a specific category is selected, show only that category
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {itemsByCategory[activeCategory]?.map((item) => (
                <FoodItemCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default RestaurantMenu;
