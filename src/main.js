import { createApp } from "vue";
import { VueQueryPlugin } from "vue-query";

import app from "./App.vue";

import router from "./router";
import { store } from "./store";

createApp(app).use(store).use(router).use(VueQueryPlugin).mount("#app");
