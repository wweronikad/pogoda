import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapPin } from '@fortawesome/free-solid-svg-icons';
import './LocationDisplay.css';

const LocationDisplay = ({ locationName }) => {
  const parseAddress = (locationName) => {
    const addressParts = locationName.split(', ');
    const streetAndNumber = addressParts[1] ? `${addressParts[1]} ${addressParts[0]}` : null;
    const city = addressParts[4] || addressParts[1] || addressParts[0];
    const postalCode = addressParts[6] || null;
    const region = addressParts[5] || null;

    return {
      city,
      streetAndNumber,
      postalCode,
      region,
    };
  };

  const { city, streetAndNumber, postalCode, region } = parseAddress(locationName);

  return (
    <div className="location-display">
      <FontAwesomeIcon icon={faMapPin} className="location-icon" />
      <div className="location-details">
        {streetAndNumber ? (
          <div className="location-city">{city}, {streetAndNumber}</div>
        ) : (
          <div className="location-city">{city}</div>
        )}
        
        {postalCode && <div className="location-postal">{postalCode} {city}</div>}

        {region && <div className="location-region">{region}</div>}
      </div>
    </div>
  );
};

export default LocationDisplay;
