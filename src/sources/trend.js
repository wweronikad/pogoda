// src/sources/trend.js
const trendText = `
Trend został obliczony na podstawie trzech ostatnich nienullowych pomiarów.
Obliczane są różnice między kolejnymi parami wartości.
Kolejno od najstarszego A do najnowszego C:
A - B
B - C
Suma tych różnic daje całkowitą zmianę.
Określenie trendu:
Rosnący, jeśli suma zmian jest większa niż 0.1. <img src='/icons/rosnacy.png' alt='Rosnący' class="trend-icon" />
Malejący, jeśli suma zmian jest mniejsza niż -0.1. <img src='/icons/malejacy.png' alt='Malejący' class="trend-icon"  />
Boczny, jeśli suma zmian mieści się między -0.1 a 0.1. <img src='/icons/boczny.png' alt='Boczny' class="trend-icon" />
`;
export default trendText;
