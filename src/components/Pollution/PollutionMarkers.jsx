import React, { useState, useEffect, useCallback } from 'react';
import { getPollutionDescription } from './AirQuality'; // Importujemy funkcję do opisu jakości powietrza
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';



const PollutionMarkers = ({ pollutionStations, pollutionData }) => {
  const [popupContent, setPopupContent] = useState({});

  // Używamy useCallback dla getWorstPollutionIndex, aby nie zmieniać referencji przy każdej renderowaniu
  const getWorstPollutionIndex = useCallback((sensors) => {
    let worstIndex = 'Brak danych';

    sensors.forEach(sensor => {
      const paramDescription = getPollutionDescription(sensor.param.paramName, sensor.latestMeasurement ? sensor.latestMeasurement.value : null);

      // Jeśli mamy opis, porównujemy indeksy i wybieramy najgorszy
      if (paramDescription !== 'Brak danych') {
        if (worstIndex === 'Brak danych' || isWorse(paramDescription, worstIndex)) {
          worstIndex = paramDescription;
        }
      }
    });

    return worstIndex;
  }, []);

  // Funkcja, która porównuje dwa opisy i zwraca true, jeśli pierwszy opis jest gorszy od drugiego
  const isWorse = (currentIndex, worstIndex) => {
    const levels = ['bardzo dobry', 'dobry', 'umiarkowany', 'dostateczny', 'zły', 'bardzo zły'];
    return levels.indexOf(currentIndex) > levels.indexOf(worstIndex);
  };

  const setPopupContentForStation = useCallback((stationId, sensors, airQualityIndex) => {
    const station = pollutionStations.find(station => station.id === stationId);
    if (station) {
      const worstPollutionIndex = getWorstPollutionIndex(sensors);

      const popupContent = (
        <div>
          <strong>{station.stationName}</strong><br />
          <strong>Ogólny indeks jakości powietrza:</strong> {worstPollutionIndex || 'Brak danych'}<br /><br />
          
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '5px' }}>Nazwa</th>
                <th style={{ textAlign: 'center', padding: '5px' }}>Pomiar (µg/m³)</th>
                <th style={{ textAlign: 'center', padding: '5px' }}>Indeks</th>
                <th style={{ textAlign: 'center', padding: '5px' }}>Trend</th>
              </tr>
            </thead>
            <tbody>
              {sensors.map(sensor => {
                const paramDescription = getPollutionDescription(sensor.param.paramName, sensor.latestMeasurement ? sensor.latestMeasurement.value : null);

                // Określamy ikonę na podstawie trendu
                let trendIcon = '';
                if (sensor.trend === 0) {
                  trendIcon = '/icons/malejacy.png'; // Ikona dla malejącego trendu
                } else if (sensor.trend === 2) {
                  trendIcon = '/icons/rosnacy.png'; // Ikona dla rosnącego trendu
                } else {
                  trendIcon = '/icons/boczny.png'; // Ikona dla bocznego trendu
                }

                return (
                  <tr key={sensor.id} style={{ borderBottom: '1px solid #ccc' }}>
                    <td style={{ padding: '5px' }}>{sensor.param.paramName}</td>
                    <td style={{ padding: '5px', textAlign: 'center', verticalAlign: 'middle' }}>
                      {sensor.latestMeasurement ? sensor.latestMeasurement.value : 'Brak danych'}
                    </td>
                    <td style={{ padding: '5px', textAlign: 'center', verticalAlign: 'middle' }}>
                      {paramDescription}
                    </td>
                    <td style={{ padding: '5px', textAlign: 'center', verticalAlign: 'middle' }}>
                      {sensor.latestMeasurement && (
                        <img 
                          src={trendIcon} 
                          alt="Trend ikona" 
                          width="12" 
                          height="12" 
                          style={{ verticalAlign: 'middle' }} 
                        />
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
      setPopupContent(prevPopupContent => ({
        ...prevPopupContent,
        [stationId]: popupContent,
      }));
    }
  }, [pollutionStations, getWorstPollutionIndex]);

  useEffect(() => {
    if (pollutionData && pollutionData.length > 0) {
      pollutionData.forEach(station => {
        const sensors = station.sensors || [];
        const airQualityIndex = station.airQualityIndex || 'Brak danych'; // Pobieramy indeks jakości powietrza
        setPopupContentForStation(station.id, sensors, airQualityIndex);
      });
    }
  }, [pollutionData, setPopupContentForStation]);

  return pollutionStations.map(station => {
    const lat = parseFloat(station.gegrLat);
    const lon = parseFloat(station.gegrLon);

    if (!isNaN(lat) && !isNaN(lon)) {
      const popup = popupContent[station.id] || <div>Ładowanie danych...</div>;

      return {
        id: station.id,
        position: [lat, lon],
        iconUrl: <FontAwesomeIcon icon={faLocationDot} style={{ color: 'red' }} />, // Adjust the color and style if needed
        popupContent: popup,
      };      
    }

    return null;
  }).filter(Boolean);
};

export default PollutionMarkers;
