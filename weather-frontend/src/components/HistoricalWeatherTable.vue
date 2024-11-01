<template>
    <div class="mt-8">
      <div class="flex flex-col items-center">
        <label for="location">Select Location:</label>
        <select v-model="location" id="location" class="mb-4 p-2 border rounded">
          <option value="Delhi">Delhi</option>
          <option value="Moscow">Moscow</option>
          <option value="Paris">Paris</option>
          <option value="New York">New York</option>
          <option value="Sydney">Sydney</option>
          <option value="Riyadh">Riyadh</option>
        </select>
  
        <label for="from-date">From:</label>
        <input type="date" v-model="fromDate" id="from-date" class="mb-4 p-2 border rounded" />
  
        <label for="to-date">To:</label>
        <input type="date" v-model="toDate" id="to-date" class="mb-4 p-2 border rounded" />
  
        <button @click="getHistoricalWeather" class="bg-blue-500 text-white p-2 rounded">Get Historical Weather</button>
      </div>
      
      <table class="min-w-full mt-6">
        <thead>
          <tr>
            <th class="border px-4 py-2">Date</th>
            <th class="border px-4 py-2">Temperature</th>
            <th class="border px-4 py-2">Description</th>
            <th class="border px-4 py-2">Feels Like</th>
            <th class="border px-4 py-2">Sunset</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="weather in historicalWeather" :key="weather.date">
            <td class="border px-4 py-2">{{ new Date(weather.date).toLocaleDateString() }}</td>
            <td class="border px-4 py-2">{{ weather.temperature }}°C</td>
            <td class="border px-4 py-2">{{ weather.description }}</td>
            <td class="border px-4 py-2">{{ weather.feels_like }}°C</td>
            <td class="border px-4 py-2">{{ new Date(weather.sunset * 1000).toLocaleTimeString() }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import gql from 'graphql-tag';
  
  export default {
    name: 'HistoricalWeatherTable',
    data() {
      return {
        location: 'Delhi',
        fromDate: '',
        toDate: '',
        historicalWeather: [],
      };
    },
    methods: {
      async getHistoricalWeather() {
        if (!this.fromDate || !this.toDate || new Date(this.toDate) - new Date(this.fromDate) > 30 * 24 * 60 * 60 * 1000) {
          alert('Please select a valid date range within 30 days.');
          return;
        }
  
        const response = await this.$apollo.query({
          query: gql`
            query($city: String!, $from: String!, $to: String!) {
              getHistoricalWeather(city: $city, from: $from, to: $to) {
                date
                temperature
                description
                feels_like
                sunset
              }
            }
          `,
          variables: { city: this.location, from: this.fromDate, to: this.toDate },
        });
  
        this.historicalWeather = response.data.getHistoricalWeather;
      },
    },
  };
  </script>
  
  