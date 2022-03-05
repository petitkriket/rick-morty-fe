import { characterService } from "../../../services/models/character";
import { ADD_CHARACTERS, ADD_CHARACTER } from "./mutations";

export const FETCH_CHARACTERS = "FETCH_CHARACTERS";
export const FETCH_CHARACTER = "FETCH_CHARACTER";

/**
 * Instead of handling pagination/filtering and loading states (which would overcomplicate the code)
 * Minimal use of Vuex to store characters ressources and fetch single characters only when useful
 * at /characters/:id direct access.
 */

export const actions = {
  [FETCH_CHARACTERS]({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      characterService
        .getAll(params)
        .then((response) => {
          const storedCharactersIds = state.characters.map(({ id }) => id);

          const newCharacters = response.data.results.filter(
            ({ id }) => !storedCharactersIds.includes(id)
          );

          commit(ADD_CHARACTERS, newCharacters);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  [FETCH_CHARACTER]({ state, commit }, id) {
    return new Promise((resolve, reject) => {
      const character = state.characters.find(
        (character) => character.id === id
      );

      if (character) {
        resolve(character);
        return;
      }

      characterService
        .getOne(id)
        .then((response) => {
          commit(ADD_CHARACTER, response.data);
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};
