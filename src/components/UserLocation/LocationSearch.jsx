import React, { useState, useEffect } from 'react';
import SearchInput from './SearchInput';
import LocationButton from './LocationButton';
import LocationDisplay from './LocationDisplay';
import './LocationSearch.css';

const LocationSearch = ({ onLocationSelect }) => {
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [locationName, setLocationName] = useState('Warszawa'); // Domyślna lokalizacja początkowa
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  useEffect(() => {
    if (search) {
      fetch(`https://nominatim.openstreetmap.org/search?format=json&countrycodes=pl&q=${search}`)
        .then((response) => response.json())
        .then((data) => {
          setSuggestions(data.slice(0, 5)); // Limit 5 podpowiedzi
          setIsDropdownVisible(true);
        });
    } else {
      setSuggestions([]);
      setIsDropdownVisible(false);
    }
  }, [search]);

  const handleUseLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
          .then((response) => response.json())
          .then((data) => {
            setLocationName(data.display_name || 'Unknown');
            onLocationSelect([lat, lon]);
          });
      });
    }
  };

  const handleSearch = (location) => {
    setSearch(location.display_name);
    setLocationName(location.display_name);
    setSuggestions([]);
    setIsDropdownVisible(false);
    onLocationSelect([Number(location.lat), Number(location.lon)]);
  };

  return (
    <div className="location-search-container">
      {/* First row with 3 columns */}
      <div className="row first-row">
        <div className="column small-column">
          <LocationDisplay locationName={locationName} />
        </div>
        <div className="column large-column">
          {/* Placeholder for additional information */}
          <p>Other info here</p>
        </div>
      </div>

      {/* Second row with 2 columns */}
      <div className="row second-row">
        <div className="column half-column">
          <SearchInput
            search={search}
            setSearch={setSearch}
            suggestions={suggestions}
            handleSearch={handleSearch}
            isDropdownVisible={isDropdownVisible}
            setIsDropdownVisible={setIsDropdownVisible}
          />
        </div>
        <div className="column half-column">
          <LocationButton onClick={handleUseLocation} />
        </div>
      </div>
    </div>
  );
};

export default LocationSearch;
