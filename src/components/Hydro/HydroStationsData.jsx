import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

// (mapowanie id na feature
const mapGeoJsonData = (geoJsonData) => {
  return geoJsonData.features.reduce((acc, feature) => {
    acc[feature.properties.id] = feature;
    return acc;
  }, {});
};

const HydroStationsData = ({ onDataFetch }) => {
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiDataResponse = await axios.get('https://danepubliczne.imgw.pl/api/data/hydro');
        const apiData = apiDataResponse.data;
        
        const geoJsonResponse = await axios.get('/localizations/hydro/hydro_xy.geojson');
        const geoJsonData = geoJsonResponse.data;
        const geoJsonMap = mapGeoJsonData(geoJsonData);

        const mergedData = apiData.map(station => {
          const matchingGeoJsonFeature = geoJsonMap[station.id_stacji];
          
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
              ...geoJsonProperties,
              lat: coordinates[1],
              lon: coordinates[0],
              alarmValue,
              warningValue,
              riverCourseKm,
              catchmentArea,
            };
          }

          return null;
        }).filter(station => station !== null);          

        onDataFetch(mergedData);
        setDataFetched(true);
      } catch (error) {
        console.error('Error fetching hydro data:', error);
      }
    };

    if (!dataFetched) {
      fetchData();
    }
  }, [dataFetched, onDataFetch]);

  return null;
};

HydroStationsData.propTypes = {
  onDataFetch: PropTypes.func.isRequired,
};

export default HydroStationsData;
