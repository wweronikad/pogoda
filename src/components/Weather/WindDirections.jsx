const WindDirections = ({ degree }) => {
  const getWindDirection = (degree) => {
    if (degree === null || isNaN(degree)) {
      return 'nieznany';
    }

    if ((degree >= 337.5 && degree <= 360) || (degree >= 0 && degree < 22.5)) {
      return 'północny'; // 337.5° - 22.5°
    } else if (degree >= 22.5 && degree < 67.5) {
      return 'północno-wschodni'; // 22.5° - 67.5°
    } else if (degree >= 67.5 && degree < 112.5) {
      return 'wschodni'; // 67.5° - 112.5°
    } else if (degree >= 112.5 && degree < 157.5) {
      return 'południowo-wschodni'; // 112.5° - 157.5°
    } else if (degree >= 157.5 && degree < 202.5) {
      return 'południowy'; // 157.5° - 202.5°
    } else if (degree >= 202.5 && degree < 247.5) {
      return 'południowo-zachodni'; // 202.5° - 247.5°
    } else if (degree >= 247.5 && degree < 292.5) {
      return 'zachodni'; // 247.5° - 292.5°
    } else if (degree >= 292.5 && degree < 337.5) {
      return 'północno-zachodni'; // 292.5° - 337.5°
    }
    return 'nieznany';
  };

  return getWindDirection(degree); // zwróć tekst
};

export default WindDirections;
