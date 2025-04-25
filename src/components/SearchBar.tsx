
import React, { useState } from 'react';
import { Search, Sliders, Mic, Loader } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

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
  const [isListening, setIsListening] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onSearch(newQuery); // Immediately trigger search as user types
  };

  const handleVoiceSearch = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      toast.error('Speech recognition not supported', {
        description: 'Your browser does not support voice input.'
      });
      return;
    }

    try {
      setIsListening(true);
      
      // Request microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // In a real implementation, this would capture audio and send it to the API
      // For this example, we'll simulate a response after a delay
      setTimeout(() => {
        const voiceQueryResult = "pizza restaurants near me";
        setQuery(voiceQueryResult);
        onSearch(voiceQueryResult);
        setIsListening(false);
      }, 1500);
      
      /*
      // Example of how to call the voice-to-text edge function once implemented
      const { data, error } = await supabase.functions.invoke('voice-to-text', {
        body: { audio: audioBase64Data }
      });
      
      if (error) throw error;
      
      if (data.text) {
        setQuery(data.text);
        onSearch(data.text);
      }
      */
    } catch (error: any) {
      console.error('Error with voice input:', error);
      toast.error('Voice input failed', {
        description: error.message || 'Please try typing instead.'
      });
    } finally {
      setIsListening(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <div className="relative flex items-center">
        <div className="absolute left-4 text-foodapp-gray">
          <Search size={20} />
        </div>
        <input
          type="text"
          className="w-full pl-12 pr-24 py-3 bg-white border border-gray-200 rounded-full focus:outline-none focus:border-foodapp-primary shadow-sm"
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
        />
        <div className="absolute right-14 p-1 rounded-full hover:bg-gray-100">
          <button
            type="button"
            className="p-2 rounded-full text-foodapp-gray hover:text-foodapp-primary"
            onClick={handleVoiceSearch}
            disabled={isListening}
          >
            {isListening ? <Loader size={20} className="animate-spin" /> : <Mic size={20} />}
          </button>
        </div>
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
