import { useQuery } from "vue-query";

import { episodeService } from "../services/models/episode";

export const useEpisodeSampleQuery = (episodesIds, { enabled }) => {
  return useQuery({
    queryKey: ["episodes", episodesIds],
    queryFn: () => episodeService.getSample(episodesIds.value),
    select: ({ data }) => data,
    options: { enabled },
  });
};
