<template>
  <div :class="$style.container">
    <router-link :to="{ name: 'CharacterPage', params: { id: character.id } }">
      <img :src="character.image" :alt="character.name" />
    </router-link>

    <div :class="$style.specifications">
      <b>{{ character.name }}</b>
      <span>Gender: {{ character.gender }}</span>
      <span>Status: {{ character.status }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "CharacterCard",
  props: {
    character: {
      type: Object,
      default: () => ({
        id: null,
        name: "",
        image: "",
        status: "",
        gender: "",
      }),
    },
  },
};
</script>

<style lang="scss" module>
.container {
  border: 1px solid #ccc;
  border-radius: 4px;

  .separator {
    margin-bottom: 4px;
    border: 1px solid #ccc;
  }

  img {
    width: 100%;
    object-fit: cover;
    border-bottom: 1px solid #ccc;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }

  .specifications {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 8px;
  }
}
</style>
