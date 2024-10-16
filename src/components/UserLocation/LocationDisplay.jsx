import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapPin } from '@fortawesome/free-solid-svg-icons';
import './LocationDisplay.css';

const LocationDisplay = ({ locationName }) => {
  // Zakładam, że 'locationName' jest długim stringiem i trzeba go rozbić
  const parseAddress = (locationName) => {
    const addressParts = locationName.split(', '); // Rozdziel adres na fragmenty
    const streetAndNumber = addressParts[1] ? `${addressParts[1]} ${addressParts[0]}` : null; // Ulica i numer, sprawdzanie istnienia
    const city = addressParts[4] || addressParts[1] || addressParts[0]; // Miasto, sprawdzanie wartości dostępnych w adresie
    const postalCode = addressParts[6] || null; // Kod pocztowy
    const region = addressParts[5] || null; // Województwo

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
        {/* Jeśli jest ulica i numer, wyświetl je. W przeciwnym razie pokaż tylko miasto */}
        {streetAndNumber ? (
          <div className="location-city">{city}, {streetAndNumber}</div>
        ) : (
          <div className="location-city">{city}</div>
        )}
        
        {/* Sprawdzenie, czy kod pocztowy istnieje, jeśli tak, wyświetl go */}
        {postalCode && <div className="location-postal">{postalCode} {city}</div>}

        {/* Sprawdzenie, czy region (województwo) istnieje */}
        {region && <div className="location-region">{region}</div>}
      </div>
    </div>
  );
};

export default LocationDisplay;
