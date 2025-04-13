
import React from 'react';
import { categories } from '@/data/mockData';
import { ScrollArea } from "@/components/ui/scroll-area";

interface CategoryFilterProps {
  activeCategory: string;
  onSelectCategory: (id: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ activeCategory, onSelectCategory }) => {
  return (
    <div className="mb-8">
      <ScrollArea className="w-full whitespace-nowrap pb-4">
        <div className="flex space-x-3 px-2">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`px-4 py-2 rounded-full transition-all flex items-center ${
                activeCategory === category.id 
                  ? 'bg-foodapp-primary text-white shadow-md' 
                  : 'bg-white border border-gray-200 hover:bg-gray-50 text-gray-700'
              }`}
              onClick={() => onSelectCategory(category.id)}
            >
              {category.icon && (
                <span className="mr-2">{category.icon}</span>
              )}
              {category.name}
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default CategoryFilter;
