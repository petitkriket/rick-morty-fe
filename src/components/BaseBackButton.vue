<script setup>
const props = defineProps({
  fallbackRoute: {
    type: String,
    default: "/",
  },
});

import { useRouter } from "vue-router";
const router = useRouter();

const hasHistory = () => window.history.length > 2;
const backOrFallback = () =>
  hasHistory ? router.go(-1) : router.push(props.fallbackRoute);
</script>

<template>
  <span :class="$style.goBack">
    <button @click="backOrFallback">Go Back</button>
  </span>
</template>

<style lang="scss" module>
.goBack {
  display: flex;
  cursor: pointer;

  button {
    padding: 8px;
    border: 0;
    cursor: pointer;
  }
}
</style>
