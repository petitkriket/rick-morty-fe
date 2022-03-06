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

<script>
import { mapState } from "vuex";

import { mapActions } from "vuex";
import { FETCH_CHARACTER } from "../store/modules/characters/actions";

import BaseBackButton from "../components/BaseBackButton.vue";

export default {
  components: { BaseBackButton },
  name: "CharacterPage",
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.getCharacter(Number(to.params.id));
    });
  },
  methods: {
    ...mapActions("characters", [FETCH_CHARACTER]),
    async getCharacter(id) {
      this[FETCH_CHARACTER](id);
    },
  },
  computed: {
    ...mapState("characters", ["characters"]),
    character() {
      return this.characters.find(
        (character) => character.id === Number(this.$route.params.id)
      );
    },
  },
};
</script>

<style lang="scss" module>
.characterPage {
  margin: 0 45px;

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
