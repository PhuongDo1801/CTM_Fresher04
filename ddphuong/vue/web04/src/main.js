import { createApp } from 'vue';
import App from './App.vue';
import MISAInputText from './components/input/MISAInputText.vue';
import MISAButton from './components/button/MISAButton.vue';
const app = createApp(App);
app.component('m-inputText', MISAInputText);
app.component('m-button', MISAButton);
app.mount('#app');
