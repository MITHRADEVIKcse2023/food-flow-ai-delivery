
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import SearchBar from '@/components/SearchBar';
import RestaurantList from '@/components/RestaurantList';
import { useQuery } from '@tanstack/react-query';
import { MapPin, FilterX } from 'lucide-react';
import { toast } from "sonner";

const Restaurants: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterVisible, setFilterVisible] = useState(false);

  // This would normally fetch from Supabase but we'll simulate for now
  const { data: restaurants, isLoading, error } = useQuery({
    queryKey: ['restaurants'],
    queryFn: async () => {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      // For now, use mock data but later connect to Supabase
      return import('@/data/mockData').then(module => module.restaurants);
    }
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    toast.info(`Searching for "${query}"...`);
  };

  const toggleFilter = () => {
    setFilterVisible(!filterVisible);
  };

  return (
    <Layout>
      <div className="food-app-container py-8">
        {/* Header Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-3xl font-bold">Restaurants</h1>
            <div className="flex items-center text-foodapp-gray text-sm">
              <MapPin size={16} className="mr-1" />
              <span>123 Main St, New York</span>
            </div>
          </div>
          <p className="text-foodapp-gray mb-6">Find the best food near you</p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8">
          <SearchBar 
            onSearch={handleSearch} 
            placeholder="Find restaurants..." 
            onFilterClick={toggleFilter}
          />
        </div>

        {/* Restaurant List Section */}
        {isLoading ? (
          <div className="py-20 text-center">
            <div className="animate-pulse inline-block h-8 w-8 rounded-full bg-foodapp-primary/30 mb-4"></div>
            <p className="text-foodapp-gray">Finding restaurants near you...</p>
          </div>
        ) : error ? (
          <div className="py-20 text-center">
            <div className="flex justify-center mb-4">
              <FilterX size={32} className="text-red-500" />
            </div>
            <p className="text-foodapp-gray">Unable to load restaurants. Please try again.</p>
          </div>
        ) : (
          <RestaurantList initialSearchQuery={searchQuery} />
        )}
      </div>
    </Layout>
  );
};

export default Restaurants;
