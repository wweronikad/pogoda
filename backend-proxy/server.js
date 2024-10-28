const express = require('express');
const axios = require('axios');
const app = express();
const port = 5000; // Możesz zmienić port, jeśli potrzebujesz

// Middleware do obsługi CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// Endpoint do pobierania sensorów stacji
app.get('/api/station/sensors/:stationId', async (req, res) => {
  try {
    const response = await axios.get(`https://api.gios.gov.pl/pjp-api/rest/station/sensors/${req.params.stationId}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Endpoint do pobierania danych pomiarowych
app.get('/api/data/getData/:sensorId', async (req, res) => {
  try {
    const response = await axios.get(`https://api.gios.gov.pl/pjp-api/rest/data/getData/${req.params.sensorId}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Uruchomienie serwera
app.listen(port, () => {
  console.log(`Serwer proxy działa na porcie ${port}`);
});
