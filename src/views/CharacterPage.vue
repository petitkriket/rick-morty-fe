<script setup>
import BaseBackButton from "../components/BaseBackButton.vue";

import { onBeforeMount, computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

const route = useRoute();
const store = useStore();

const getCharacter = async (id) => {
  store.dispatch("characters/FETCH_CHARACTER", id);
};

onBeforeMount(async () => getCharacter(route.params.id));

const character = computed(() =>
  store.state.characters.characters.find(
    ({ id }) => id === Number(route.params.id)
  )
);
</script>

<template>
  <div :class="$style.characterPage">
    <BaseBackButton />
    <div :class="$style.container">
      <img :src="character.image" :alt="character.name" />

      <div :class="$style.specifications">
        <h2>{{ character.name }}</h2>
        <span>Gender: {{ character.gender }}</span>
        <span>Status: {{ character.status }}</span>
        <span>Species: {{ character.species }}</span>
        <span>Location: {{ character.origin.name }}</span>
        <span>Present in {{ character.episode.length }} episodes</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
.characterPage {
  margin: 16px 64px 0;

  .container {
    margin-top: 12px;
    display: flex;
    flex-direction: row;
    gap: 16px;
    align-items: center;

    .specifications {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
      margin-left: 16px;
    }
  }
}
</style>
