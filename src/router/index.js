import Vue from "vue";
import VueRouter from "vue-router";

import LandingPage from "../views/LandingPage.vue";
import CharactersListPage from "../views/CharactersListPage.vue";
import CharacterPage from "../views/CharacterPage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "LandingPage",
    component: LandingPage,
  },
  {
    path: "/characters",
    name: "CharactersListPage",
    component: CharactersListPage,
  },
  {
    path: "/characters/:id",
    name: "CharacterPage",
    component: CharacterPage,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
