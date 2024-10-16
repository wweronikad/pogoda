import React, { useEffect, useState } from 'react';
import * as turf from '@turf/turf';
import StationDataTable from './Tables/StationDataTables';
import './NearestStation.css';

const NearestStation = ({ userLocation, Stations, nearestStationText, type }) => {
  const [nearestStation, setNearestStation] = useState(null);
  const [distanceToNearestStation, setDistanceToNearestStation] = useState(null);

  useEffect(() => {
    const findNearestStation = () => {
      if (userLocation && Stations.length > 0) {
        const userPoint = turf.point(userLocation);
        let nearestDist = Infinity;
        let nearestStation = null;

        Stations.forEach((station) => {
          let lat, lon;
          if (station) {
            if (station.lat && station.lon) {
              lat = parseFloat(station.lat);
              lon = parseFloat(station.lon);
            } else if (station.gegrLat && station.gegrLon) {
              lat = parseFloat(station.gegrLat);
              lon = parseFloat(station.gegrLon);
            } else if (station.y && station.x) {
              lat = parseFloat(station.y);
              lon = parseFloat(station.x);
            }

            if (!isNaN(lat) && !isNaN(lon)) {
              const stationPoint = turf.point([lat, lon]);
              const distance = turf.distance(userPoint, stationPoint);

              if (distance < nearestDist) {
                nearestDist = distance;
                nearestStation = station;
              }
            }
          }
        });

        setNearestStation(nearestStation);
        setDistanceToNearestStation(nearestDist.toFixed(2));
      }
    };

    findNearestStation();
  }, [userLocation, Stations]);

  const getStationName = (station) => {
    if (type === 'pollution') {
      return station.stationName || 'Brak nazwy';
    } else if (type === 'weather') {
      return station.stacja || 'Brak nazwy';
    } else if (type === 'hydro') {
      return station.stacja || 'Brak nazwy';
    }
    return 'Brak nazwy';
  };

  return (
    <div className="nearest-station">
      {nearestStation ? (
        <>
          {/* Centered container for the title and station name */}
          <div className="station-heading-container">
            <h3>{nearestStationText}</h3>
            <h4>{getStationName(nearestStation)}</h4>
          </div>

          <div className="station-data-container">
            <StationDataTable station={nearestStation} type={type} />
          </div>
          <div>Odległość do najbliższej stacji: {distanceToNearestStation} kilometrów</div>
        </>
      ) : (
        <div>
          <strong>Ładowanie lokalizacji...</strong>
          <br />
          <div>Odległość do najbliższej stacji: Ładowanie...</div>
        </div>
      )}
    </div>
  );
};

export default NearestStation;
