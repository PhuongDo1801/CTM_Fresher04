import { createApp } from "vue";
import App from "./App.vue";
import MISAInput from "./components/input/MISAInput.vue";
import MISAToastMessage from "./components/toat-message/MISAToastMessage.vue";
import MISACombobox from './components/combobox/MISACombobox.vue'
import MISADialog from "./components/dialog/MISADialog.vue";
import MISAResource from "./scripts/resource";
import MISAEnum from "./scripts/enum";

import router from "./router";
const app = createApp(App);
app.component("m-input", MISAInput);
app.component("m-toast-message", MISAToastMessage);
app.component("m-dialog", MISADialog);
app.component("m-combobox", MISACombobox);

app.config.globalProperties.$_MISAResource = MISAResource;
app.config.globalProperties.$_MISAEnum = MISAEnum;
app.config.globalProperties.$_LANGCODE = 'vn-VI'

app.use(router)

app.mount("#app");
