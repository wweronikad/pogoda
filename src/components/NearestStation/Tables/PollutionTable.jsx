import React from 'react';
import UniversalTable from './UniversalTable';
import { getPollutionColor } from '../AirQualityColors';
import TrendIcon from '../../Pollution/TrendIcon';

const parameterFormulas = {
  'dwutlenek azotu': 'NO2',
  'ozon': 'ozon O3',
  'dwutlenek siarki': 'SO2',
  'benzen': 'C6H6',
  'tlenek węgla': 'CO',
};

const PollutionTable = ({ station }) => {
  // Znajdujemy najstarszą datę pomiaru
  const getOldestMeasurementDate = (sensors) => {
    if (!sensors || sensors.length === 0) {
      return 'Brak danych';
    }

    const dates = sensors
      .map(sensor => sensor.latestMeasurement ? new Date(sensor.latestMeasurement.date) : null)
      .filter(date => date !== null); // Filtrujemy null wartości, jeśli są

    if (dates.length === 0) {
      return 'Brak danych';
    }

    const oldestDate = new Date(Math.min(...dates)); // Znajdujemy najstarszą datę
    return oldestDate.toISOString().replace('T', ' ').split('.')[0]; // Formatowanie daty
  };

  const oldestDate = getOldestMeasurementDate(station.sensors);

  // Definiujemy kolumny (już bez kolumny Data)
  const columns = [
    { key: 'parameter', label: 'Parametr' },
    { key: 'latestMeasurement', label: `Pomiar z ${oldestDate}` }, // Wyświetlamy najstarszą datę w nagłówku
    { key: 'trend', label: 'Trend' },
  ];

  const getParameterWithFormula = (paramName) => {
    const formula = parameterFormulas[paramName];
    return formula ? `${paramName} (${formula})` : paramName;
  };

  const parametersAtEnd = ['benzen', 'tlenek węgla'];

  const data = station.sensors
    ? station.sensors
        .map((sensor) => {
          const paramName = sensor.param.paramName.toLowerCase();
          return {
            paramName: paramName,
            parameter: getParameterWithFormula(sensor.param.paramName),
            latestMeasurement: sensor.latestMeasurement ? (
              <span
                style={{
                  color: getPollutionColor(
                    sensor.param.paramName,
                    sensor.latestMeasurement.value
                  ),
                  fontWeight: 'bold', // Pogrubienie czcionki
                }}
              >
                {sensor.latestMeasurement.value} μg/m³
              </span>
            ) : (
              'Ładowanie...'
            ),
            trend: sensor.trend !== null ? (
              <div style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                <TrendIcon trend={sensor.trend} />
              </div>
            ) : (
              'Ładowanie...'
            ),
          };
        })
        .sort((a, b) => {
          const aIsAtEnd = parametersAtEnd.includes(a.paramName);
          const bIsAtEnd = parametersAtEnd.includes(b.paramName);

          if (aIsAtEnd && !bIsAtEnd) return 1;
          if (!aIsAtEnd && bIsAtEnd) return -1;
          return 0; // Zachowaj oryginalną kolejność dla pozostałych
        })
    : [];

  return <UniversalTable columns={columns} data={data} />;
};

export default PollutionTable;
