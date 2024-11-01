const mongoose = require('mongoose');

const WeatherSchema = new mongoose.Schema({
  city: String,
  description: String,
  temperature: Number,
  feels_like: Number,
  sunset: Number,
  icon: String,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Weather', WeatherSchema);
