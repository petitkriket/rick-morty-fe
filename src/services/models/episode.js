import { rickAndMortyAPI } from "../index";

const resource = "/episode/";

export const episodeService = {
  getSample(ids) {
    const url = resource + ids.join(",");
    return rickAndMortyAPI.get(url);
  },
};
