
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import SearchBar from '@/components/SearchBar';
import RestaurantList from '@/components/RestaurantList';
import RecommendationSection from '@/components/RecommendationSection';

const Index: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log('Search query:', query);
    // In a real app, this would filter restaurants based on the search query
  };

  return (
    <Layout>
      <div className="food-app-container py-8">
        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden mb-10 bg-foodapp-primary/10">
          <div className="absolute inset-0 bg-gradient-to-r from-foodapp-primary/20 to-transparent"></div>
          <div className="py-12 px-8 md:px-12 md:w-2/3 relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Food delivery made <span className="text-foodapp-primary">easy</span>
            </h1>
            <p className="text-lg mb-6 max-w-lg">
              Order food from the best local restaurants and get it delivered to your doorstep
            </p>
            <div className="max-w-md">
              <SearchBar onSearch={handleSearch} />
            </div>
          </div>
          <img 
            src="https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=780&q=80"
            alt="Delicious Food" 
            className="absolute right-0 top-0 h-full w-1/3 object-cover hidden lg:block"
          />
        </div>

        {/* Restaurants Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Popular Restaurants</h2>
          <RestaurantList />
        </div>

        {/* AI-powered Recommendations */}
        <RecommendationSection />
      </div>
    </Layout>
  );
};

export default Index;
