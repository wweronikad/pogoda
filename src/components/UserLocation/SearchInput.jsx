import React, { useState } from 'react';
import SuggestionsList from './SuggestionsList';
import './SearchInput.css';

const SearchInput = ({ search, setSearch, suggestions, handleSearch, isDropdownVisible, setIsDropdownVisible }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleBlur = () => {
    setTimeout(() => {
      setIsDropdownVisible(false);
      setIsFocused(false); // Zresetuj focus, gdy użytkownik wyjdzie z pola
    }, 100);
  };

  const handleFocus = () => {
    if (suggestions.length > 0) {
      setIsDropdownVisible(true);
    }
    setIsFocused(true);
  };

  const handleInputChange = (e) => {
    setSearch(e.target.value);
    if (e.target.value === '') {
      setIsDropdownVisible(false);
    } else {
      setIsDropdownVisible(true);
    }
  };

  return (
    <div className="input-container">
      <input
        className="search-input"
        type="text"
        value={search}
        onChange={handleInputChange}
        placeholder={isFocused && search === '' ? '' : 'Wpisz miejscowość...'}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {isDropdownVisible && isFocused && suggestions.length > 0 && (
        <SuggestionsList
          suggestions={suggestions}
          handleSearch={handleSearch}
          setIsDropdownVisible={setIsDropdownVisible}
          setIsFocused={setIsFocused}
        />
      )}
    </div>
  );
};

export default SearchInput;
