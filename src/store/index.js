import { createStore } from "vuex";

import characters from "./modules/characters";

export const store = createStore({
  state() {
    return {};
  },
  modules: {
    characters,
  },
});
