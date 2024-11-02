import React, { useState, useEffect, useCallback } from 'react';
import { getPollutionDescription } from './AirQuality';
import { getColorForIndex } from './ColorUtils'; 
import TrendIcon from './TrendIcon';
import '@fortawesome/fontawesome-free/css/all.min.css'; 

const PollutionMarkers = ({ pollutionStations, pollutionData }) => {
  const [popupContent, setPopupContent] = useState({});
  const [worstPollutionIndices, setWorstPollutionIndices] = useState({});

  const getWorstPollutionIndex = useCallback((sensors) => {
    let worstIndex = 'Brak danych';

    sensors.forEach(sensor => {
      const paramDescription = getPollutionDescription(
        sensor.param.paramName,
        sensor.latestMeasurement ? sensor.latestMeasurement.value : null
      );

      if (paramDescription !== 'Brak danych' && paramDescription !== 'brak danych') {
        if (worstIndex === 'Brak danych' || isWorse(paramDescription, worstIndex)) {
          worstIndex = paramDescription;
        }
      }
    });

    return worstIndex;
  }, []);

  const isWorse = (currentIndex, worstIndex) => {
    const levels = ['bardzo dobry', 'dobry', 'umiarkowany', 'dostateczny', 'zły', 'bardzo zły'];
    return levels.indexOf(currentIndex) > levels.indexOf(worstIndex);
  };

  const setPopupContentForStation = useCallback((stationId, sensors, airQualityIndex) => {
    const station = pollutionStations.find(station => station.id === stationId);
    if (station) {
      const worstPollutionIndex = getWorstPollutionIndex(sensors);
      const color = getColorForIndex(worstPollutionIndex || 'unknown');

      const popupContent = (
        <div>
          <strong>{station.stationName}</strong><br />
          <strong>Ogólny indeks jakości powietrza: </strong> 
          <span style={{ color: color }}>
            {worstPollutionIndex || 'Brak danych'}
          </span>
          <i
            className="fa-regular fa-circle-question"
            style={{ marginLeft: '5px', cursor: 'pointer' }}
            title="Najmniej korzystny z indeksów parametrów dla danej stacji."
            aria-label="Więcej informacji o indeksie jakości powietrza"
          ></i>
          <br /><br />
          
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
                const paramDescription = getPollutionDescription(
                  sensor.param.paramName,
                  sensor.latestMeasurement ? sensor.latestMeasurement.value : null
                );

                const measurementColor = getColorForIndex(paramDescription || 'unknown');

                return (
                  <tr key={sensor.id} style={{ borderBottom: '1px solid #ccc' }}>
                    <td style={{ padding: '5px' }}>{sensor.param.paramName}</td>
                    <td style={{ padding: '5px', textAlign: 'center', verticalAlign: 'middle', color: measurementColor, fontWeight: 'bold' }}>
                      {sensor.latestMeasurement ? sensor.latestMeasurement.value : 'Brak danych'}
                    </td>
                    <td style={{ padding: '5px', textAlign: 'center', verticalAlign: 'middle' }}>
                      {paramDescription}
                    </td>
                    <td style={{ padding: '5px', textAlign: 'center', verticalAlign: 'middle' }}>
                      {sensor.latestMeasurement && (
                        <TrendIcon trend={sensor.trend} />
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

      setWorstPollutionIndices(prevIndices => ({
        ...prevIndices,
        [stationId]: worstPollutionIndex,
      }));
    }
  }, [pollutionStations, getWorstPollutionIndex]);

  useEffect(() => {
    if (pollutionData && pollutionData.length > 0) {
      pollutionData.forEach(station => {
        const sensors = station.sensors || [];
        const airQualityIndex = station.airQualityIndex || 'Brak danych';
        setPopupContentForStation(station.id, sensors, airQualityIndex);
      });
    }
  }, [pollutionData, setPopupContentForStation]);

  return pollutionStations.map(station => {
    const lat = parseFloat(station.gegrLat);
    const lon = parseFloat(station.gegrLon);

    if (!isNaN(lat) && !isNaN(lon)) {
      const popup = popupContent[station.id] || <div>Ładowanie danych...</div>;
      const worstIndex = worstPollutionIndices[station.id] || 'Brak danych';
      const iconColor = getColorForIndex(worstIndex);

      return {
        id: station.id,
        position: [lat, lon],
        iconColor: iconColor,
        popupContent: popup,
      };      
    }

    return null;
  }).filter(Boolean);
};

export default PollutionMarkers;
