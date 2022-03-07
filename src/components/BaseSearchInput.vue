<script setup>
import { computed } from "vue";

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

const model = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
</script>

<template>
  <div :class="$style.baseSearchInput">
    <input v-model="model" type="text" :class="$style.input" />
  </div>
</template>

<style lang="scss" module>
.baseSearchInput {
  .input {
    padding: 8px;
  }
}
</style>
