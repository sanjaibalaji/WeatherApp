<template>
    <div class="mt-4 w-full">
      <div class="p-4 rounded-lg">
        <div class="flex flex-wrap justify-around">
          <div v-for="hour in hourlyForecast.slice(0, 5)" :key="hour.dt" class="text-center w-1/5 p-2">
            <div>{{ formatTime(hour.dt) }}</div>
            <img :src="`http://openweathermap.org/img/wn/${hour.icon}@2x.png`" alt="Weather Icon" class="w-12 h-12 mx-auto" />
            <div class="font-bold">{{Math.round (hour.temp)}}°</div>
          </div>
        </div>
        <div class="w-full flex justify-center my-2">
          <hr class="border-gray-200 w-11/12">
        </div>
        <div class="flex flex-wrap justify-around">
          <div v-for="hour in hourlyForecast.slice(5, 10)" :key="hour.dt" class="text-center w-1/5 p-2">
            <div>{{ formatTime(hour.dt) }}</div>
            <img :src="`http://openweathermap.org/img/wn/${hour.icon}@2x.png`" alt="Weather Icon" class="w-12 h-12 mx-auto" />
            <div class="font-bold">{{ Math.round (hour.temp) }}°</div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HourlyForecast',
    props: ['hourlyForecast'],
    methods: {
      formatTime(timestamp) {
        const date = new Date(timestamp * 1000);
        const hours = date.getHours();
        const suffix = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12; 
        return `${formattedHours} ${suffix}`;
      },
    },
  };
  </script>
  