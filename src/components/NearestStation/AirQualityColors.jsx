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
      return 'gray';
    }
  
    switch (mappedParam) {
      case 'PM10':
        if (numericValue <= 20) return 'green';
        if (numericValue <= 50) return 'lightgreen';
        if (numericValue <= 80) return 'yellow';
        if (numericValue <= 110) return 'orange';
        if (numericValue <= 150) return 'red';
        return 'darkred';
  
      case 'PM2.5':
        if (numericValue <= 13) return 'green';
        if (numericValue <= 35) return 'lightgreen';
        if (numericValue <= 55) return 'yellow';
        if (numericValue <= 75) return 'orange';
        if (numericValue <= 110) return 'red';
        return 'darkred';
  
      case 'O3':
        if (numericValue <= 70) return 'green';
        if (numericValue <= 120) return 'lightgreen';
        if (numericValue <= 150) return 'yellow';
        if (numericValue <= 180) return 'orange';
        if (numericValue <= 240) return 'red';
        return 'darkred';
  
      case 'NO2':
        if (numericValue <= 40) return 'green';
        if (numericValue <= 100) return 'lightgreen';
        if (numericValue <= 150) return 'yellow';
        if (numericValue <= 200) return 'orange';
        if (numericValue <= 230) return 'red';
        return 'darkred';
  
      case 'SO2':
        if (numericValue <= 50) return 'green';
        if (numericValue <= 100) return 'lightgreen';
        if (numericValue <= 200) return 'yellow';
        if (numericValue <= 350) return 'orange';
        if (numericValue <= 500) return 'red';
        return 'darkred';
  
      case 'C6H6': // Nowy przypadek dla benzenu
        if (numericValue <= 5) return 'green';
        if (numericValue <= 30) return 'red';
        return 'black';
  
      case 'CO': // Nowy przypadek dla tlenku węgla
        if (numericValue <= 10000) return 'green';
        if (numericValue <= 3000) return 'red';
        return 'black';
  
      default:
        return 'gray';
    }
  };
  