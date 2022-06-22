<script setup>
import BaseBackButton from "../components/BaseBackButton.vue";

import { useRoute } from "vue-router";
import { useCharacterQuery } from "../queries/character";

const route = useRoute();

const { isSuccess, data: character } = useCharacterQuery(
  route.params.id,
  route
);
</script>

<template>
  <div :class="$style.characterPage">
    <BaseBackButton />
    <div v-if="isSuccess" :class="$style.container">
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
