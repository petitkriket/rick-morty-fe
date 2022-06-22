<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useCharacterQuery } from "../queries/character";
import { useEpisodeSampleQuery } from "../queries/episode";

const route = useRoute();

const { isSuccess, data: character } = useCharacterQuery(
  route.params.id,
  route
);

const episodesIds = computed(
  () => character.value?.episode.map((url) => url.split("/").at(-1)) || []
);
const enabled = computed(() => !!episodesIds.value);

const { isIdle, data: episodes } = useEpisodeSampleQuery(episodesIds, {
  enabled,
});
</script>

<template>
  <div class="mx-16 my-4">
    <BaseBackButton />
    <div
      v-if="isSuccess"
      class="flex items-start gap-4 mt-4 flex-col md:flex-row"
    >
      <div class="bg-stone-200 rounded-2xl shadow-lg">
        <img
          :src="character.image"
          :alt="character.name"
          class="rounded-2xl object-cover w-full md:w-[200px]"
        />
      </div>

      <div class="flex items-start gap-1 flex-col">
        <span class="font-semibold text-3xl text-neutral-900">
          {{ character.name }}
        </span>
        <div class="w-full border-b-black border-b h-1 mt-1"></div>

        <span>Gender: {{ character.gender }}</span>
        <span>Status: {{ character.status }}</span>
        <span>Species: {{ character.species }}</span>
        <span>Location: {{ character.origin.name }}</span>
      </div>

      <div>
        <span class="font-semibold text-2xl text-neutral-400">
          Episodes ({{ character.episode.length }})
        </span>

        <div class="w-full border-b-black border-b h-1 mt-3"></div>
        <template v-if="episodes">
          <ul
            v-if="!isIdle && episodesIds.length > 1"
            class="overflow-scroll h-[75vh]"
          >
            <li v-for="{ episode, id, name } in episodes" :key="id">
              {{ episode }} - {{ name }}
            </li>
          </ul>

          <ul v-if="!isIdle && episodesIds.length === 1">
            <li>
              {{ episodes.episode }}
              -
              {{ episodes.name }}
            </li>
          </ul>
        </template>
      </div>
    </div>
  </div>
</template>
