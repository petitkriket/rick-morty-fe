import { rickAndMortyAPI } from "../index";

const resource = "/character/";

export const characterService = {
  getMany(params) {
    return rickAndMortyAPI.get(resource, { params });
  },
  getOne(id) {
    return rickAndMortyAPI.get(`${resource}${id}/`);
  },
};
