const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;
const SECRET = process.env.APP_SECRET || "default";

app.get('/', (req, res) => {
  res.send('App is running 🚀');
});

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.get('/env', (req, res) => {
  res.send(`Secret is: ${SECRET}`);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
