<script setup>
import { ref } from "vue";
const searchValue = ref("");

import { useRouter } from "vue-router";
const router = useRouter();

const search = (name) =>
  router.push({ name: "CharactersPage", query: { name } });
</script>

<template>
  <div :class="$style.landingPage">
    <div class="text-white">
      <p class="leading-6 text-3xl font-semibold">Who are you looking for ?</p>
      <span class="flex flex-row gap-1">
        <a-input-search
          v-model:value="searchValue"
          enter-button
          size="large"
          @search="search(searchValue)"
        />
      </span>
      <div class="flex">
        <p class="py-2 text-base">
          Try
          <span
            class="underline cursor-pointer font-semibold"
            @click="search('Beth')"
            >Beth</span
          >
          or
          <span
            class="underline cursor-pointer font-semibold"
            @click="search('Meeseeks')"
            >Mr Meeseeks</span
          >..
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
.landingPage {
  @apply flex justify-center items-center bg-cover bg-no-repeat bg-center;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("../assets/hero.jpeg");
  height: calc(100vh - 54px);
}
</style>
