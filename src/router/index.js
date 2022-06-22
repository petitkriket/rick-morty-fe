import { createRouter, createWebHistory } from "vue-router";

import LandingPage from "../views/LandingPage.vue";
import CharactersPage from "../views/CharactersPage.vue";
import CharacterPage from "../views/CharacterPage.vue";

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

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
