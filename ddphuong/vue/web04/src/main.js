import { createApp } from 'vue';
import App from './App.vue';
import MISAInput from './components/input/MISAInput.vue';
import MISAButton from './components/button/MISAButton.vue';
const app = createApp(App);
app.component('m-input', MISAInput);
app.component('m-button', MISAButton);
app.mount('#app');
