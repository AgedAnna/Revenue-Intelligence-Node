// src/app.js
const express = require('express');
const { getInsights } = require('./controllers/insightsController');

const app = express();
app.use(express.json());

app.get('/insights', getInsights);

module.exports = app;
