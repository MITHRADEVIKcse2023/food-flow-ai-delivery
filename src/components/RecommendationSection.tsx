
import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { recommendations } from '@/data/mockData';
import FoodItemCard from './FoodItemCard';
import { ChevronRight } from 'lucide-react';

const RecommendationSection: React.FC = () => {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold mb-6">Recommended For You</h2>
      
      {recommendations.map((section) => (
        <div key={section.id} className="mb-10">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">{section.title}</h3>
            <button className="text-sm text-foodapp-primary hover:underline flex items-center">
              See All
              <ChevronRight size={16} className="ml-1" />
            </button>
          </div>
          
          <ScrollArea className="w-full pb-6">
            <div className="flex space-x-4 pb-2">
              {section.items.map((item) => (
                <div key={item.id} className="min-w-[250px] max-w-[250px] hover:scale-105 transition-transform duration-200">
                  <FoodItemCard item={item} showRestaurantName />
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      ))}
    </div>
  );
};

export default RecommendationSection;
