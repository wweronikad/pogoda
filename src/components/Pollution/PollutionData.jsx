import { useState, useEffect } from 'react';
import axios from 'axios';
import { calculateTrend } from './PollutionTrend'; // Import the calculateTrend function

const PollutionData = ({ stationsData, onCombinedDataFetch }) => {
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    if (stationsData && stationsData.length > 0 && !dataFetched) {
      const fetchPollutionData = async () => {
        try {
          const sensorsPromises = stationsData.map(async (station) => {
            const sensorsResponse = await axios.get(`https://cors-anywhere.herokuapp.com/https://api.gios.gov.pl/pjp-api/rest/station/sensors/${station.id}`);
            const sensorsData = sensorsResponse.data;

            const sensorsWithMeasurements = [];

            for (const sensor of sensorsData) {
              try {
                const measurementsResponse = await axios.get(`https://cors-anywhere.herokuapp.com/https://api.gios.gov.pl/pjp-api/rest/data/getData/${sensor.id}`);
                const measurementsData = measurementsResponse.data;

                let latestMeasurement = null;
                for (let i = 0; i < measurementsData.values.length; i++) {
                  if (measurementsData.values[i].value !== null) {
                    latestMeasurement = measurementsData.values[i];
                    break;
                  }
                }

                // Calculate the trend for this sensor using the imported function
                const trend = calculateTrend(measurementsData.values, sensor.id);

                sensorsWithMeasurements.push({
                  ...sensor,
                  latestMeasurement,
                  trend,  // Add the calculated trend
                });
              } catch (error) {
                console.error('Błąd przy fetchowaniu:', error);
              }
            }

            return {
              ...station,
              sensors: sensorsWithMeasurements,
            };
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
