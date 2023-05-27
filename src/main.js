import { createApp } from "vue";
import App from "./App.vue";
import MISAInput from './components/input/MISAInput.vue';
const app = createApp(App);
app.component("m-input", MISAInput);
app.mount("#app");
