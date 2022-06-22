<script setup>
const emit = defineEmits(["next", "prev"]);

const props = defineProps({
  currentPage: {
    type: [String, Number],
    default: "1",
  },
  pageCount: {
    type: [String, Number],
    default: "-",
  },
  hasNextPage: {
    type: Boolean,
    default: false,
  },
  hasPrevPage: {
    type: Boolean,
    default: false,
  },
});

defineExpose({ ...props });
</script>

<template>
  <div :class="$style.pagination">
    <p>{{ currentPage }} / {{ pageCount }}</p>

    <button v-if="hasPrevPage" :class="$style.button" @click="emit('prev')">
      Previous Page
    </button>

    <button v-if="hasNextPage" :class="$style.button" @click="emit('next')">
      Next Page
    </button>
  </div>
</template>

<style lang="scss" module>
.pagination {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;

  .button {
    background: #cd323c;
    color: #fff;
    padding: 8px;
    border: 0;
    cursor: pointer;
  }
}
</style>
