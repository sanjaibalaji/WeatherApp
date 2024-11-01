const Weather = require('../models/Weather');
const fetch = require('node-fetch');

const resolvers = {
  Query: {
    getWeather: async (_, { city }) => {
      try {
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=60762c68bc667621817eade348723d3c`);
        const data = await response.json();

        const hourlyResponse = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=60762c68bc667621817eade348723d3c`);
        const hourlyData = await hourlyResponse.json();

        if (!hourlyData.list || hourlyData.list.length === 0) {
          throw new Error("No hourly forecast data available");
        }
        const interpolate = (start, end, step) => {
          const result = [];
          for (let i = 0; i < step; i++) {
            result.push((start * (step - i) + end * i) / step);
          }
          return result;
        };

        const hourly = [];
        for (let i = 0; i < 10; i++) {
          const hour = hourlyData.list[i];
          const nextHour = hourlyData.list[i + 1];
          if (nextHour) {
            const temps = interpolate(hour.main.temp, nextHour.main.temp, 3);
            const icons = interpolate(parseInt(hour.weather[0].icon, 10), parseInt(nextHour.weather[0].icon, 10), 3);
            for (let j = 0; j < 3; j++) {
              hourly.push({
                dt: hour.dt + (j * 3600),
                temp: temps[j] - 273.15, 
                icon: hour.weather[0].icon
              });
            }
          } else {
            hourly.push({
              dt: hour.dt,
              temp: hour.main.temp - 273.15,
              icon: hour.weather[0].icon,
            });
          }
        }

        const weather = {
          city,
          description: data.weather[0].description,
          temperature: data.main.temp - 273.15, 
          feels_like: data.main.feels_like - 273.15, 
          sunset: data.sys.sunset,
          icon: data.weather[0].icon,
          hourly: hourly.slice(0, 10), 
        };

        await Weather.create(weather);
        return weather;

      } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch weather data");
      }
    },
    getHistoricalWeather: async (_, { city, from, to }) => {
      return Weather.find({
        city,
        date: { $gte: new Date(from), $lte: new Date(to) }
      });
    },
  },
  Mutation: {
    addWeather: async (_, { city, description, temperature, feels_like, sunset, icon }) => {
      const weather = new Weather({ city, description, temperature, feels_like, sunset, icon });
      return weather.save();
    },
  },
};

module.exports = resolvers;
