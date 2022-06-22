import { useQuery } from "vue-query";

import { characterService } from "../services/models/character";
import { characterFormatter } from "../formatters/character";

export const useCharactersQuery = (params) => {
  const keys = ["characters", params];

  return useQuery(keys, () => characterService.getMany(params.value), {
    keepPreviousData: true,
    select: ({ data }) => {
      return {
        ...data,
        results: data.results.map(characterFormatter),
      };
    },
  });
};

export const useCharacterQuery = (id) => {
  const keys = ["character", id];
  return useQuery(keys, () => characterService.getOne(id), {
    select: ({ data }) => characterFormatter(data),
  });
};
