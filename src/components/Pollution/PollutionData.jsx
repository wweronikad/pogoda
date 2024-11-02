import { useState, useEffect } from 'react';
import axios from 'axios';
import { calculateTrend } from './PollutionTrend';

const PollutionData = ({ stationsData, onCombinedDataFetch }) => {
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    if (stationsData && stationsData.length > 0 && !dataFetched) {
      const fetchPollutionData = async () => {
        try {
          const sensorsPromises = stationsData.map(async (station) => {
            const sensorsResponse = await axios.get(`http://localhost:5000/api/station/sensors/${station.id}`);
            const sensorsData = sensorsResponse.data;

            const sensorsWithMeasurements = await Promise.all(
              sensorsData.map(async (sensor) => {
                const measurementsResponse = await axios.get(`http://localhost:5000/api/data/getData/${sensor.id}`);
                const measurementsData = measurementsResponse.data;
                const latestMeasurement = measurementsData.values.find(v => v.value !== null);
                const trend = calculateTrend(measurementsData.values, sensor.id);
                return { ...sensor, latestMeasurement, trend };
              })
            );

            return { ...station, sensors: sensorsWithMeasurements };
          });

          const stationsWithSensors = await Promise.all(sensorsPromises);
          onCombinedDataFetch(stationsWithSensors);
          setDataFetched(true);
        } catch (error) {
          console.error('Błąd przy fetchowaniu:', error);
        }
      };

      fetchPollutionData();
    }
  }, [dataFetched, onCombinedDataFetch, stationsData]);

  return null;
};

export default PollutionData;
