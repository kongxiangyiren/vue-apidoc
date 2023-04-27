import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import 'virtual:windi.css';
import 'virtual:windi-devtools';

import '@/assets/main.scss';

const app = createApp(App);

app.use(router);

app.mount('#app');
