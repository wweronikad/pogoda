// StationData.jsx
import React from 'react';
import PollutionTable from './PollutionTable';
import WeatherTable from './WeatherTable';
import HydroTable from './HydroTable';

const StationData = ({ station, type }) => {
  if (!station) {
    console.error('StationData: station prop is undefined');
    return <div>Error: Station data is missing.</div>;
  }

  switch (type) {
    case 'pollution':
      return <PollutionTable station={station} />;
    case 'weather':
      return <WeatherTable station={station} />;
    case 'hydro':
      return <HydroTable station={station} />;
    default:
      return null;
  }
};

export default StationData;
