import React from 'react';
import PropTypes from 'prop-types';
import UniversalTable from './UniversalTable';

const HydroTable = ({ station }) => {
  const columns = [
    { key: 'parameter', label: 'Parametr' },
    { key: 'latestMeasurement', label: `Pomiar z ${station.stan_wody_data_pomiaru || 'Ładowanie...'}` },
  ];

  const data = [
    { parameter: 'Rzeka', latestMeasurement: station.rzeka || 'Ładowanie...' },
    { parameter: 'Stan wody', latestMeasurement: station.stan_wody ? `${station.stan_wody} cm` : 'Ładowanie...' },
    { parameter: 'Temperatura wody', latestMeasurement: station.temperatura_wody ? `${station.temperatura_wody} °C` : 'Brak danych' },
    { parameter: 'Zjawisko lodowe', latestMeasurement: station.zjawisko_lodowe === '0' ? 'Brak' : 'Obecne' },
    { parameter: 'Zjawisko zarastania', latestMeasurement: station.zjawisko_zarastania === '0' ? 'Brak' : 'Obecne' },
    { parameter: 'Wartość alarmowa', latestMeasurement: station.alarmValue ? `${station.alarmValue} cm` : 'Brak danych' },
    { parameter: 'Wartość ostrzegawcza', latestMeasurement: station.warningValue ? `${station.warningValue} cm` : 'Brak danych' },
  ];

  return <UniversalTable columns={columns} data={data} />;
};

HydroTable.propTypes = {
  station: PropTypes.object.isRequired,
};

export default HydroTable;
