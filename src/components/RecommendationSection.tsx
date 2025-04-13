
import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { recommendations } from '@/data/mockData';
import FoodItemCard from './FoodItemCard';

const RecommendationSection: React.FC = () => {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold mb-6">Recommended For You</h2>
      
      {recommendations.map((section) => (
        <div key={section.id} className="mb-8">
          <h3 className="text-lg font-medium mb-4">{section.title}</h3>
          <ScrollArea className="w-full pb-4">
            <div className="flex space-x-4">
              {section.items.map((item) => (
                <div key={item.id} className="min-w-[250px] max-w-[250px]">
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
