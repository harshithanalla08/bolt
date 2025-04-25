import React, { useState, useEffect, useRef } from 'react';
import { getSearchSuggestions } from '../utils/filterUtils';

const SearchBar = ({ doctors, searchTerm, setSearchTerm, onSearch }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    if (searchTerm) {
      const newSuggestions = getSearchSuggestions(doctors, searchTerm);
      setSuggestions(newSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm, doctors]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch(searchTerm);
      setIsFocused(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    onSearch(suggestion);
    setIsFocused(false);
  };

  return (
    <div className="relative w-full" ref={searchRef}>
      <div className="relative">
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded-md pl-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search for doctors..."
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          data-testid="autocomplete-input"
        />
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
      </div>
      
      {isFocused && suggestions.length > 0 && (
        <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 shadow-lg">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="p-3 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSuggestionClick(suggestion)}
              data-testid="suggestion-item"
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;