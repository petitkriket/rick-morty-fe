<template>
  <div :class="$style.characterPage">
    <BaseBackButton />
    <!-- <div>
      <img :src="character.image" :alt="character.name" />

      <div :class="$style.specifications">
        <h2>{{ character.name }}</h2>
        <span>Gender: {{ character.gender }}</span>
        <span>Status: {{ character.status }}</span>
      </div>
    </div> -->
  </div>
</template>

<script>
import BaseBackButton from "../components/BaseBackButton.vue";

export default {
  components: { BaseBackButton },
  name: "CharacterPage",
};
</script>

<style lang="scss" module>
.characterPage {
  margin: 0 45px;
}
</style>
