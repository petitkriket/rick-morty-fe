<script setup>
import BaseSearchInput from "../components/BaseSearchInput.vue";

import { ref } from "vue";
const searchValue = ref("");

import { useRouter } from "vue-router";
const router = useRouter();

const search = (name) =>
  router.push({ name: "CharactersPage", query: { name } });
</script>

<template>
  <div :class="$style.landingPage">
    <div :class="$style.fieldGroup">
      <h2>Who are you looking for ?</h2>

      <span :class="$style.searchInput">
        <BaseSearchInput
          v-model="searchValue"
          @keyup.enter="search(searchValue)"
        />
        <button @click="search(searchValue)">Find</button>
      </span>
      <div :class="$style.suggestions">
        <p>
          Try
          <a @click="search('Beth')">Beth</a>
          or
          <a @click="search('Meeseeks')">Mr Meeseeks</a>..
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
.landingPage {
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("../assets/hero.jpeg");
  height: 80vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;

  .fieldGroup {
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;

    .searchInput {
      display: flex;
      flex-direction: row;
      gap: 4px;
    }
    .suggestions {
      display: flex;

      a {
        font-size: 14px;
        color: white;
        cursor: pointer;
        font-weight: bold;
        text-decoration: underline;
      }
    }
  }
}
</style>
