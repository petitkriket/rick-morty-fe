export const ADD_CHARACTERS = "ADD_CHARACTERS";
export const ADD_CHARACTER = "ADD_CHARACTER";

export const mutations = {
  [ADD_CHARACTERS](state, payload) {
    state.characters = [...state.characters, ...payload];
  },
  [ADD_CHARACTER](state, payload) {
    state.characters = [...state.characters, payload];
  },
};
