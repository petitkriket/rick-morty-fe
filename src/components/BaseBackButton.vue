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
  <a-button @click="backOrFallback">&#8592; Go Back</a-button>
</template>
