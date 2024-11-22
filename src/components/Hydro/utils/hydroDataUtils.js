// utils/hydroDataUtils.js

export const mapGeoJsonData = (geoJsonData) => {
    return geoJsonData.features.reduce((acc, feature) => {
      acc[feature.properties.id] = feature;
      return acc;
    }, {});
  };
  
  export const mergeHydroData = (apiData, geoJsonMap) => {
    return apiData
      .map((station) => {
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
      })
      .filter((station) => station !== null); // Filter out unmatched stations
  };
  