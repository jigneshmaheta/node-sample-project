const express = require('express');
const promClient = require('prom-client');

const app = express();

const PORT = process.env.PORT || 3000;
const SECRET = process.env.APP_SECRET || "default";

// Create a Registry for metrics
const register = new promClient.Registry();

// Add default metrics (CPU, memory, etc.)
promClient.collectDefaultMetrics({ register });

app.get('/', (req, res) => {
  res.send('App is running 🚀');
});

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.get('/env', (req, res) => {
  res.send(`Secret is: ${SECRET}`);
});

// Metrics endpoint for Prometheus
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 