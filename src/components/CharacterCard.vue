<script setup>
import { computed } from "vue";
import colors from "tailwindcss/colors";

const props = defineProps({
  character: {
    type: Object,
    required: true,
  },
});

const statusClass = computed(() => {
  const dict = {
    Alive: "bg-lime-500",
    Dead: "bg-red-500",
    unknown: "bg-stone-400",
  };
  return dict[props.character.status] || dict.unknown;
});

const speciesColor = computed(() => {
  const dict = {
    Humanoid: colors.blue[300],
    Human: colors.blue[500],
    Alien: colors.purple[500],
    unknown: colors.purple[300],
  };
  return dict[props.character.species] || dict.unknown;
});

const character = { ...props.character };
</script>

<template>
  <a-card hoverable class="max-w-sm">
    <template #cover>
      <router-link
        :to="{ name: 'CharacterPage', params: { id: character.id } }"
      >
        <div class="relative">
          <div class="bg-stone-200">
            <img
              :src="character.image"
              :alt="character.name"
              class="object-cover w-[100%]"
            />
          </div>

          <div
            :class="[
              'absolute w-full py-0.5 bottom-0 text-white text-xs text-center capitalize leading-4',
              statusClass,
            ]"
          >
            {{ character.status }}
          </div>
        </div>
      </router-link>
    </template>
    <a-card-meta :title="character.name">
      <template #description>
        <div class="flex gap-1">
          <a-badge
            :count="character.gender"
            :number-style="{ backgroundColor: colors.gray[400] }"
          />
          <a-badge
            :count="character.species"
            :number-style="{ backgroundColor: speciesColor }"
          />
        </div>
      </template>
    </a-card-meta>
  </a-card>
</template>
