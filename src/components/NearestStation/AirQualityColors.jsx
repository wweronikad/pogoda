// Importujemy kolory z ColorUtils.js
import { pollutionColors } from './../Pollution/ColorUtils';

const parameterMap = {
  'pył zawieszony PM10': 'PM10',
  'pył zawieszony PM2.5': 'PM2.5',
  'dwutlenek azotu': 'NO2',
  'ozon': 'O3',
  'dwutlenek siarki': 'SO2',
  'benzen': 'C6H6',
  'tlenek węgla': 'CO',
};

export const getPollutionColor = (param, value) => {
  const mappedParam = parameterMap[param] || param;
  const numericValue = parseFloat(value);

  if (isNaN(numericValue)) {
    return pollutionColors.unknown;
  }

  switch (mappedParam) {
    case 'PM10':
      if (numericValue <= 20) return pollutionColors.veryGood;
      if (numericValue <= 50) return pollutionColors.good;
      if (numericValue <= 80) return pollutionColors.moderate;
      if (numericValue <= 110) return pollutionColors.sufficient;
      if (numericValue <= 150) return pollutionColors.bad;
      return pollutionColors.veryBad;

    case 'PM2.5':
      if (numericValue <= 13) return pollutionColors.veryGood;
      if (numericValue <= 35) return pollutionColors.good;
      if (numericValue <= 55) return pollutionColors.moderate;
      if (numericValue <= 75) return pollutionColors.sufficient;
      if (numericValue <= 110) return pollutionColors.bad;
      return pollutionColors.veryBad;

    case 'O3':
      if (numericValue <= 70) return pollutionColors.veryGood;
      if (numericValue <= 120) return pollutionColors.good;
      if (numericValue <= 150) return pollutionColors.moderate;
      if (numericValue <= 180) return pollutionColors.sufficient;
      if (numericValue <= 240) return pollutionColors.bad;
      return pollutionColors.veryBad;

    case 'NO2':
      if (numericValue <= 40) return pollutionColors.veryGood;
      if (numericValue <= 100) return pollutionColors.good;
      if (numericValue <= 150) return pollutionColors.moderate;
      if (numericValue <= 200) return pollutionColors.sufficient;
      if (numericValue <= 230) return pollutionColors.bad;
      return pollutionColors.veryBad;

    case 'SO2':
      if (numericValue <= 50) return pollutionColors.veryGood;
      if (numericValue <= 100) return pollutionColors.good;
      if (numericValue <= 200) return pollutionColors.moderate;
      if (numericValue <= 350) return pollutionColors.sufficient;
      if (numericValue <= 500) return pollutionColors.bad;
      return pollutionColors.veryBad;

    case 'C6H6': // Benzen
      if (numericValue <= 5) return pollutionColors.veryGood;
      if (numericValue <= 30) return pollutionColors.bad;
      return pollutionColors.veryBad;

    case 'CO': // Tlenek węgla
      if (numericValue <= 10000) return pollutionColors.veryGood;
      if (numericValue <= 30000) return pollutionColors.bad;
      return pollutionColors.veryBad;

    default:
      return pollutionColors.unknown;
  }
};
