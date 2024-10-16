import { useEffect, useState } from 'react';
import axios from 'axios';

const WeatherDataComponent = ({ onDataFetch }) => {
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    if (!dataFetched) {
      const fetchData = async () => {
        try {
          const apiData = await axios.get('https://danepubliczne.imgw.pl/api/data/synop');

          const geoJsonDataResponse = await axios.get('/localizations/weather/stacje_synoptyczne_metadata.geojson');
          const geoJsonData = geoJsonDataResponse.data;

          const mergedData = apiData.data
            .map(apiItem => {
              if (apiItem.stacja === "Platforma") {
                return null;
              }

              const stationId = apiItem.id_stacji;
              const kodStacji = stationId.slice(-3); // 3 ostanie cyfry kodu żeby się matchowały

              const matchingFeature = geoJsonData.features.find(
                feature => feature.properties['kod stacji'] === kodStacji
              );

              const lat = matchingFeature ? matchingFeature.geometry.coordinates[1] : null;
              const lon = matchingFeature ? matchingFeature.geometry.coordinates[0] : null;

              return {
                ...apiItem,
                lon,
                lat,
              };
            })
            .filter(item => item !== null);

          // wysyłane do parent comonent
          onDataFetch(mergedData);
          setDataFetched(true);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }
  }, [dataFetched, onDataFetch]);

  return null;
};

export default WeatherDataComponent;
