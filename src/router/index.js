import Vue from "vue";
import VueRouter from "vue-router";

import LandingPage from "../views/LandingPage.vue";
import CharactersPage from "../views/CharactersPage.vue";
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
    name: "CharactersPage",
    component: CharactersPage,
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
