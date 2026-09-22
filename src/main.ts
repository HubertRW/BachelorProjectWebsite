import './assets/main.css'

import { createApp } from 'vue'

import App from './App.vue';
import router from './router';
import Primevue from 'primevue/config';
import Aura from '@primeuix/themes/aura';

createApp(App).use(router).use(Primevue, {
    theme: {preset: Aura}}
).mount('#app')
