import { useQuery } from "vue-query";

import { characterService } from "../services/models/character";
import { characterFormatter } from "../formatters/character";

export const useCharactersQuery = (params) => {
  return useQuery({
    queryKey: ["characters", params],
    queryFn: () => characterService.getMany(params.value),
    select: ({ data }) => {
      return {
        ...data,
        results: data.results.map(characterFormatter),
      };
    },
  });
};

export const useCharacterQuery = (id) => {
  return useQuery({
    queryKey: ["character", id],
    queryFn: () => characterService.getOne(id),
    select: ({ data }) => characterFormatter(data),
  });
};
