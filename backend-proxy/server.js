const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Dodano pakiet cors
const app = express();
const port = 5000;

// Middleware do obsługi CORS
app.use(cors({
  origin: '*',
  methods: ['GET'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Nagłówki bezpieczeństwa
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  next();
});

const apiRouter = express.Router();

// Endpoint do sensorów stacji
apiRouter.get('/station/sensors/:stationId', async (req, res) => {
  try {
    const { stationId } = req.params;
    const response = await axios.get(`https://api.gios.gov.pl/pjp-api/rest/station/sensors/${stationId}`);
    res.json(response.data);
  } catch (error) {
    console.error(`Błąd pobierania sensorów dla stacji ${req.params.stationId}:`, error.message);
    res.status(error.response?.status || 500).json({
      message: 'Błąd pobierania sensorów stacji',
      details: error.message
    });
  }
});

// Endpoint do  danych pomiarowych
apiRouter.get('/data/getData/:sensorId', async (req, res) => {
  try {
    const { sensorId } = req.params;
    const response = await axios.get(`https://api.gios.gov.pl/pjp-api/rest/data/getData/${sensorId}`);
    res.json(response.data);
  } catch (error) {
    console.error(`Błąd pobierania danych dla sensora ${req.params.sensorId}:`, error.message);
    res.status(error.response?.status || 500).json({
      message: 'Błąd pobierania danych pomiarowych',
      details: error.message
    });
  }
});

app.use('/api', apiRouter);

app.listen(port, () => {
  console.log(`Serwer proxy działa na porcie ${port}`);
});
