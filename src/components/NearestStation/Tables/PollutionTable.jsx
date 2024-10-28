import React from 'react';
import UniversalTable from './UniversalTable';
import { getPollutionColor } from '../AirQualityColors';

const parameterFormulas = {
  'dwutlenek azotu': 'NO2',
  'ozon': 'ozon O3',
  'dwutlenek siarki': 'SO2',
  'benzen': 'C6H6',
  'tlenek węgla': 'CO',
};

const PollutionTable = ({ station }) => {
  const columns = [
    { key: 'parameter', label: 'Parametr' },
    { key: 'latestMeasurement', label: 'Najnowszy pomiar' },
    { key: 'trend', label: 'Trend' },
  ];

  const displayTrend = (trend) => {
    switch (trend) {
      case 0:
        return 'Malejący';
      case 1:
        return 'Boczny';
      case 2:
        return 'Rosnący';
      default:
        return 'Brak danych';
    }
  };

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
            trend:
              sensor.trend !== null
                ? displayTrend(sensor.trend)
                : 'Ładowanie...',
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
