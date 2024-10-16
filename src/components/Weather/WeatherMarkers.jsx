import React from 'react';
import WindDirection from './WindDirections'; // Import nowego komponentu

const WeatherMarkers = ({ weatherStations }) => {
  return weatherStations.map(station => {
    const lat = parseFloat(station.lat);
    const lon = parseFloat(station.lon);

    if (!isNaN(lat) && !isNaN(lon)) {
      const windDirectionDegree = parseFloat(station.kierunek_wiatru);

      const popupContent = (
        <div>
          <strong>{station.stacja}</strong><br />
          Pomiar: {station.data_pomiaru} {station.godzina_pomiaru}:00<br />
          Temperatura: {station.temperatura} °C<br />
          Wilgotność: {station.wilgotnosc_wzgledna} %<br />
          Ciśnienie: {station.cisnienie} Pa<br />
          Prędkość wiatru: {station.predkosc_wiatru} km/h<br />
          Kierunek wiatru: <WindDirection degree={windDirectionDegree} /><br />
          Suma opadu: {station.suma_opadu} mm<br />
        </div>
      );

      return {
        id: station.id,
        position: [lat, lon],
        iconUrl: '/icons/weather_pin.png',
        popupContent,
      };
    }

    return null;
  }).filter(Boolean);
};

export default WeatherMarkers;
