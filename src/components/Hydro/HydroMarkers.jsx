// HydroMarkers.jsx
import React from 'react';

const HydroMarkers = ({ hydroStations }) => {
  return hydroStations.map(station => {
    const lat = parseFloat(station.lat);
    const lon = parseFloat(station.lon);

    if (!isNaN(lat) && !isNaN(lon)) {
      const popupContent = (
        <div>
          <strong>{station.stacja || "Ładowanie lokalizacji..."}</strong><br />
          Rzeka: {station.rzeka || "Ładowanie..."}<br />
          Województwo: {station.województwo || "Ładowanie..."}<br />
          Stan wody: {station.stan_wody ? `${station.stan_wody} cm` : "Ładowanie..."}<br />
          Data pomiaru: {station.stan_wody_data_pomiaru || "Ładowanie..."}<br />
          Temperatura wody: {station.temperatura_wody ? `${station.temperatura_wody} °C` : "Brak danych"}<br />
          Zjawisko lodowe: {station.zjawisko_lodowe === "0" ? "Brak" : "Obecne"}<br />
          Zjawisko zarastania: {station.zjawisko_zarastania === "0" ? "Brak" : "Obecne"}<br />
          Wartość alarmowa: {station.alarmValue ? `${station.alarmValue} cm` : "Brak danych"}<br />
          Wartość ostrzegawcza: {station.warningValue ? `${station.warningValue} cm` : "Brak danych"}<br />
          Kilometraż rzeki: {station.riverCourseKm ? `${station.riverCourseKm} km` : "Brak danych"}<br />
          Powierzchnia zlewni: {station.catchmentArea ? `${station.catchmentArea} km²` : "Brak danych"}<br />
        </div>
      );

      return {
        id: station.id_stacji,
        position: [lat, lon],
        iconClass: 'fa-solid fa-droplet', // Używamy klasy ikony Font Awesome
        iconColor: '#0686AD', // Ustawiamy kolor ikony na ciemnoniebieski
        popupContent,
      };
    }

    return null;
  }).filter(Boolean);
};

export default HydroMarkers;
