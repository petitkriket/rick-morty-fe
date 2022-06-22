import { createApp } from "vue";
import { VueQueryPlugin } from "vue-query";

import app from "./App.vue";

import router from "./router";
import { store } from "./store";

import "./assets/css/index.css";
import "ant-design-vue/dist/antd.variable.min.css";
import "./theme";

createApp(app).use(store).use(router).use(VueQueryPlugin).mount("#app");
