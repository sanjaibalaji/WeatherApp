 <template>
  <div class="min-h-screen w-full flex items-center justify-center bg-weather bg-cover bg-center bg-fixed">
    <div class="p-8 rounded-lg shadow-lg w-full max-w-4xl bg-cover bg-center bg-fixed">
      <div class="flex flex-col md:flex-row items-stretch justify-between p-6 bg-opacity-70 backdrop-blur-sm rounded-lg h-full">
       
        <div class="flex flex-col items-center md:items-start text-center md:text-left w-full md:w-1/2 p-4">
          <div v-if="weather" class="text-center md:text-center p-4 bg-white bg-opacity-30 backdrop-blur-sm rounded-lg w-full h-full flex flex-col justify-between">
            <div class="flex justify-between items-center w-full">
            </div>
            <img :src="`http://openweathermap.org/img/wn/${weather.icon}@2x.png`" alt="Weather Icon" class="w-24 h-24 mx-auto my-2" />
            <div class="text-6xl font-bold text-black">{{ Math.round (weather.temperature)}}°C</div>
            <div class="text-xl text-black">{{ weather.description }}</div>
            <div class="text-lg text-black">{{ city }}</div>
            <div class="text-sm text-black">
            {{
              new Date().toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })
            }}
          </div>
            <div class="text-sm text-black">Feels like {{ Math.round (weather.feels_like) }}°C</div>
            <div class="text-sm text-black">Sunset {{ new Date(weather.sunset * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }}</div>
          </div>
        </div>
    
        <div class="flex flex-col justify-between w-full md:w-1/2 h-full">
        
          <div class="bg-white bg-opacity-30 backdrop-blur-sm p-4 rounded-lg mb-4 h-1/2">
            <HourlyForecast :hourlyForecast="hourlyForecast" />
          </div>
          
          <div class="text-center p-4 text-black bg-white bg-opacity-30 backdrop-blur-sm rounded-lg h-1/2">
            Improve him believe opinion offered met and end cheered forbade. Friendly as stranger speedy by recurred. Son interest wandered sir addition end say. Manners beloved affixed picture men ask.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watchEffect } from 'vue';
import gql from 'graphql-tag';
import { useQuery } from '@vue/apollo-composable';
import HourlyForecast from '../components/HourlyForecast.vue';

export default {
  props: ['city'],
  components: {
    HourlyForecast,
  },
  setup(props) {
    const weather = ref(null);
    const hourlyForecast = ref([]);

    const { result, loading, error } = useQuery(
      gql`
        query($city: String!) {
          getWeather(city: $city) {
            description
            temperature
            feels_like
            sunset
            icon
            hourly {
              dt
              temp
              icon
            }
          }
        }
      `,
      { city: props.city }
    );

    watchEffect(() => {
      if (!loading.value && result.value) {
        weather.value = result.value.getWeather;
        hourlyForecast.value = result.value.getWeather.hourly;
      }
    });

    return {
      weather,
      hourlyForecast,
      loading,
      error,
    };
  },
};
</script>



