
import React from 'react';
import { categories } from '@/data/mockData';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Pizza, Coffee, Salad, Beef, IceCream, Sandwich } from 'lucide-react';
// Import a suitable replacement icon since Fish doesn't exist in lucide-react
import { Fish as FishIcon } from 'lucide-react';

interface CategoryFilterProps {
  activeCategory: string;
  onSelectCategory: (id: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ activeCategory, onSelectCategory }) => {
  // Map of category IDs to icon components
  const categoryIcons: Record<string, React.ReactNode> = {
    'pizza': <Pizza size={18} />,
    'burger': <Beef size={18} />,
    'sushi': <FishIcon size={18} />,  // Changed to FishIcon alias
    'dessert': <IceCream size={18} />,
    'coffee': <Coffee size={18} />,
    'salad': <Salad size={18} />,
    'sandwich': <Sandwich size={18} />
  };

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
              {categoryIcons[category.id] && (
                <span className="mr-2">{categoryIcons[category.id]}</span>
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
