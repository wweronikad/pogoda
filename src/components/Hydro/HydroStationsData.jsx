import { useEffect, useState } from 'react';
import axios from 'axios';

const HydroStationsData = ({ onDataFetch }) => {
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    if (!dataFetched) {
      const fetchData = async () => {
        try {
          // Fetch hydro data from the API
          const apiDataResponse = await axios.get('https://danepubliczne.imgw.pl/api/data/hydro');
          const apiData = apiDataResponse.data;
          
          // Fetch coordinates and additional properties from the GeoJSON file
          const geoJsonResponse = await axios.get('/localizations/hydro/hydro_xy.geojson');
          const geoJsonData = geoJsonResponse.data;

          // Merge API data with GeoJSON based on the station ID
          const mergedData = apiData.map(station => {
            const matchingGeoJsonFeature = geoJsonData.features.find(
              feature => feature.properties.id === station.id_stacji
            );
          
            if (matchingGeoJsonFeature) {
              const { coordinates } = matchingGeoJsonFeature.geometry;
              const {
                alarmValue,
                warningValue,
                riverCourseKm,
                catchmentArea,
                ...geoJsonProperties
              } = matchingGeoJsonFeature.properties;
              
              return {
                ...station,
                ...geoJsonProperties, // Include other properties from GeoJSON
                lat: coordinates[1],
                lon: coordinates[0],
                alarmValue, 
                warningValue,
                riverCourseKm,
                catchmentArea,
              };
            }
          
            return null; // Ignore stations without matching GeoJSON data
          }).filter(station => station !== null);          

          onDataFetch(mergedData);
          setDataFetched(true);
        } catch (error) {
          console.error('Error fetching hydro data:', error);
        }
      };

      fetchData();
    }
  }, [dataFetched, onDataFetch]);

  return null;
};

export default HydroStationsData;
