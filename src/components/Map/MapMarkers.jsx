import PollutionMarkers from '../Pollution/PollutionMarkers';
import WeatherMarkers from '../Weather/WeatherMarkers';
import HydroMarkers from '../Hydro/HydroMarkers';

const MapMarkers = ({ position, pollutionStations, pollutionData, weatherStations, hydroStations }) => {
  const pollutionMarkers = PollutionMarkers({ pollutionStations, pollutionData });
  const weatherMarkers = WeatherMarkers({ weatherStations });
  const hydroMarkers = HydroMarkers({ hydroStations });

  return [
    ...pollutionMarkers.map((marker, index) => ({ ...marker, id: `${marker.id}-p-${index}` })),
    ...weatherMarkers.map((marker, index) => ({ ...marker, id: `${marker.id}-w-${index}` })),
    ...hydroMarkers.map((marker, index) => ({ ...marker, id: `${marker.id}-h-${index}` })),
    {
      id: 'user',
      position: position,
      iconClass: 'fa-solid fa-location-dot',
      iconColor: 'blue',
      iconSize: '24px',
      popupContent: 'Twoja lokalizacja',
    },
  ];
};

export default MapMarkers;
