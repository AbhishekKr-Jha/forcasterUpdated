import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';

createApp(App).use(VueToast, {
    position: 'top'
}).mount('#app')
