export const calculateTrend = (measurementsData, sensorId) => {

  // Filtrujemy dane, aby otrzymać wartości, które nie są nullami, a potem bierzemy ostatnie 3
  const validValues = measurementsData.filter(item => item.value !== null).slice(0, 3);
  const validCount = validValues.length;

  // Sprawdzamy, czy mamy dokładnie 3 ważne pomiary
  if (validCount === 3) {

    // Pobieramy wartości pomiarów
    const values = validValues.map(item => item.value);

    // Obliczamy różnice między kolejnymi wartościami (dwa różne porównania, bo mamy 3 pomiary)
    let diffs = [];
    for (let i = 0; i < validCount - 1; i++) {
      diffs.push(values[i] - values[i + 1]);
    }

    // Sumujemy różnice
    const totalChange = diffs.reduce((sum, diff) => sum + diff, 0);

    // Określamy trend na podstawie sumy różnic
    let trend;
    if (totalChange > 0.1) {
      trend = 2; // rosnący
    } else if (totalChange < -0.1) {
      trend = 0; // malejący
    } else {
      trend = 1; // boczny
    }

    return trend;
  } else {
    // Zwracamy null, jeśli nie ma wystarczającej liczby ważnych pomiarów
    return null;
  }
};
