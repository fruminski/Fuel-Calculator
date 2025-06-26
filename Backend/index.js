const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
require('dotenv').config();

app.use(cors());
app.use(express.json());

// In-memory store (you'll replace this with a DB later)
let journeys = [];

// POST /journey
app.post('/journey', (req, res) => {
  const journey = req.body;
  journeys.push(journey);
  res.status(201).json({ message: 'Journey saved', journey });
});

// GET /journeys
app.get('/journeys', (req, res) => {
  res.json(journeys);
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});