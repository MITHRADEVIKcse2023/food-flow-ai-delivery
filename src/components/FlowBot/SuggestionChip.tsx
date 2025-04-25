
import React from 'react';

interface SuggestionChipProps {
  text: string;
  onClick: () => void;
}

const SuggestionChip: React.FC<SuggestionChipProps> = ({ text, onClick }) => {
  // Add emoji based on suggestion content
  const getEmoji = (suggestion: string): string => {
    const lowerCaseSuggestion = suggestion.toLowerCase();
    
    if (lowerCaseSuggestion.includes('pizza')) return '🍕 ';
    if (lowerCaseSuggestion.includes('burger')) return '🍔 ';
    if (lowerCaseSuggestion.includes('salad') || lowerCaseSuggestion.includes('vegan')) return '🥗 ';
    if (lowerCaseSuggestion.includes('dessert') || lowerCaseSuggestion.includes('sweet')) return '🍰 ';
    if (lowerCaseSuggestion.includes('drink') || lowerCaseSuggestion.includes('beverage')) return '🥤 ';
    if (lowerCaseSuggestion.includes('track')) return '📦 ';
    if (lowerCaseSuggestion.includes('offer') || lowerCaseSuggestion.includes('discount')) return '🏷️ ';
    if (lowerCaseSuggestion.includes('recommend')) return '✨ ';
    
    return '';
  };

  return (
    <button
      onClick={onClick}
      className="bg-gray-100 hover:bg-gray-200 text-foodapp-gray px-3 py-1.5 rounded-full text-sm transition-colors"
    >
      {getEmoji(text)}{text}
    </button>
  );
};

export default SuggestionChip;
