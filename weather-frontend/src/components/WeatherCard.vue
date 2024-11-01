<template>
  <div class="text-center p-4">
    <div class="p-4 rounded-lg bg-white bg-opacity-30 backdrop-blur-sm">
      <div class="text-6xl font-bold">{{ weather.temperature }}°C</div>
      <div class="text-xl">{{ weather.description }}</div>
      <img :src="`http://openweathermap.org/img/wn/${weather.icon}@2x.png`" alt="Weather Icon" class="mx-auto" />
      <div class="text-sm">{{ city }}</div>
      <div class="text-sm">{{ new Date().toLocaleDateString() }}</div>
      <div class="text-sm">Feels like {{ weather.feels_like }}°C</div>
      <div class="text-sm">Sunset {{ new Date(weather.sunset * 1000).toLocaleTimeString() }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WeatherCard',
  props: ['weather', 'city'],
};
</script>

