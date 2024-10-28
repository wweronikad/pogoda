// LocationSearchButton.jsx

import React from 'react';

const LocationSearchButton = ({ onSearch }) => {
  return (
    <button onClick={onSearch}>
      Search
    </button>
  );
};

export default LocationSearchButton;
