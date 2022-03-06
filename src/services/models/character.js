import { rickAndMortyAPI } from "../index";

const resource = "/character/";

export const characterService = {
  getAll(params) {
    return rickAndMortyAPI.get(resource, { params });
  },
  getOne(id) {
    return rickAndMortyAPI.get(`${resource}${id}/`);
  },
};
