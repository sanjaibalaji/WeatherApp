<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100">
    <h1 class="text-2xl mb-4">Weather App</h1>
    <form @submit.prevent="validateCity" class="flex flex-col items-center mb-8">
      <input
        v-model="city"
        type="text"
        placeholder="Enter city"
        class="p-2 border rounded mb-4"
      />
      <button type="submit" class="bg-blue-500 text-white p-2 rounded">Search</button>
    </form>

   
    <div v-if="isPopupVisible" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center">
        <p class="text-lg mb-4">Please enter a valid city name</p>
        <button @click="isPopupVisible = false" class="bg-blue-500 text-white p-2 rounded">
          Close
        </button>
      </div>
    </div>
  

  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'HomePage',
  setup() {
    const city = ref('');
    const router = useRouter();
      const isPopupVisible = ref(false);

    
    const validCities = [
      'Delhi', 'Moscow', 'Paris', 'New York', 'Sydney', 'Riyadh'
    ];

    const validateCity = () => {
      
      if (!validCities.includes(city.value.trim())) {
          isPopupVisible.value = true; 
      } else {
        
        router.push({ name: 'WeatherResults', params: { city: city.value } });
      }
    };

    return {
      city,
      validateCity,
        isPopupVisible,
    };
  },
};
</script>