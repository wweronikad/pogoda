import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { API_ENDPOINTS } from './config/apiConfig';
import { mapGeoJsonData, mergeHydroData } from './utils/hydroDataUtils';

const HydroStationsData = ({ onDataFetch }) => {
  const [dataFetched, setDataFetched] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHydroData = async () => {
      try {
        // Fetch API
        const apiDataResponse = await axios.get(API_ENDPOINTS.HYDRO_DATA);
        const apiData = apiDataResponse.data;

        // Fetch GeoJSON
        const geoJsonResponse = await axios.get(API_ENDPOINTS.HYDRO_GEOJSON);
        const geoJsonData = geoJsonResponse.data;

        // Map and merge
        const geoJsonMap = mapGeoJsonData(geoJsonData);
        const mergedData = mergeHydroData(apiData, geoJsonMap);

        // Pass the merged data to the parent component
        onDataFetch(mergedData);
        setDataFetched(true);
      } catch (err) {
        console.error('Error fetching hydro data:', err);
        setError('Failed to load hydro station data. Please try again.');
      }
    };

    if (!dataFetched) {
      fetchHydroData();
    }
  }, [dataFetched, onDataFetch]);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return null;
};

HydroStationsData.propTypes = {
  onDataFetch: PropTypes.func.isRequired,
};

export default HydroStationsData;
