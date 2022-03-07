<script setup>
const props = defineProps({
  character: {
    type: Object,
    required: true,
  },
});

const character = { ...props.character };
</script>

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

<style lang="scss" module>
.container {
  border: 1px solid #ccc;
  border-radius: 4px;

  &:hover {
    transition: all 400ms cubic-bezier(0.175, 0.885, 0, 1);
    box-shadow: rgba(67, 71, 85, 0.27) 0 0 0.25em,
      rgba(90, 125, 188, 0.05) 0 0.25em 1em;
    transform: scale(1.03, 1.03);
  }

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
