export const calculateTrend = (measurementsData, sensorId) => {

  const validValues = measurementsData.filter(item => item.value !== null).slice(0, 5);
  const validCount = validValues.length;

  if (validCount >= 3) {

    const values = validValues.map(item => item.value);

    let diffs = [];
    for (let i = 0; i < validCount - 1; i++) {
      diffs.push(values[i] - values[i + 1]);
    }

    const totalChange = diffs.reduce((sum, diff) => sum + diff, 0);

    let trend;
    if (totalChange > 0.1) {
      trend = 2; // rosnacy
    } else if (totalChange < -0.1) {
      trend = 0; //malejacy
    } else {
      trend = 1; // boczny
    }

    return trend;
  } else {
    return null;
  }
};
