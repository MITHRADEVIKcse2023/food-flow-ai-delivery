
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import SearchBar from '@/components/SearchBar';
import RestaurantList from '@/components/RestaurantList';

const Restaurants: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log('Search query:', query);
  };

  return (
    <Layout>
      <div className="food-app-container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-6">All Restaurants</h1>
          <SearchBar onSearch={handleSearch} placeholder="Find restaurants..." />
        </div>
        <RestaurantList />
      </div>
    </Layout>
  );
};

export default Restaurants;
