import { createApp } from "vue";
import App from "./App.vue";

import MButton from "@/components/button/MButton.vue";
import MInput from "@/components/input/MInput.vue";
import MContextMenu from "@/components/context_menu/MContextMenu.vue";
import MDataTable from "@/components/data_table/MDataTable.vue";
const app = createApp(App);

app.component("m-button", MButton);
app.component("m-input", MInput);
app.component("m-context-menu", MContextMenu);
app.component("m-data-table", MDataTable);
app.mount("#app");
