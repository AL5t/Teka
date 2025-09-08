import '@/assets/styles/main.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import router from '@/router';
import PrimeVue from 'primevue/config';
import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';
import ConfirmationService from 'primevue/confirmationservice';
import Tooltip from 'primevue/tooltip';

import App from './App.vue';

const app = createApp(App);

app.config.errorHandler = (error, instance, info) => {
  console.error("Global error:", error);
  console.log("Vue instance:", instance);
  console.log("Error info:", info);
};

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
        50: '{zinc.50}',
        100: '{zinc.100}',
        200: '{zinc.200}',
        300: '{zinc.300}',
        400: '{zinc.400}',
        500: '{zinc.500}',
        600: '{zinc.600}',
        700: '{zinc.700}',
        800: '{zinc.800}',
        900: '{zinc.900}',
        950: '{zinc.950}'
    }
  }
});

app.use(pinia);
app.use(router);
app.use(PrimeVue, {
    theme: {
        preset: MyPreset,
        options: {
          darkModeSelector: 'none',
        }
    }
});
app.use(ConfirmationService);
app.directive('tooltip', Tooltip);

app.mount('#app');
