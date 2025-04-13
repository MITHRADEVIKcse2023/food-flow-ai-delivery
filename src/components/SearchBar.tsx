
import React, { useState } from 'react';
import { Search, Sliders } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  onFilterClick?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  placeholder = 'Search for restaurants or foods...', 
  onFilterClick 
}) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <div className="relative flex items-center">
        <div className="absolute left-4 text-foodapp-gray">
          <Search size={20} />
        </div>
        <input
          type="text"
          className="w-full pl-12 pr-12 py-3 bg-white border border-gray-200 rounded-full focus:outline-none focus:border-foodapp-primary shadow-sm"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button 
          type="button" 
          className="absolute right-4 p-1 rounded-full hover:bg-gray-100"
          onClick={onFilterClick}
        >
          <Sliders size={20} className="text-foodapp-gray" />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
