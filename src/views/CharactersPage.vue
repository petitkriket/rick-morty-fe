<script setup>
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import _omitBy from "lodash.omitby";

import { useCharactersQuery } from "../queries/character";

const router = useRouter();
const route = useRoute();
const searchValue = ref(route.query.name);
const queryParams = computed(() => route.query);
const currentPage = computed(() => Number(route.query.page || 1));

const {
  isError,
  isLoading,
  isSuccess,
  data: characters,
} = useCharactersQuery(queryParams);

// TODO: extract to a filter composable
const onFilterChange = (params) => {
  const query = _omitBy(
    {
      ...route.query,
      ...params,
    },
    (value) => [null, undefined, ""].includes(value)
  );

  router.push({ query });
};

const onSearch = (name) => onFilterChange({ name, page: undefined });
const paginate = (page) => onFilterChange({ page });
const resetFilters = () => router.push({ query: {} });
const hasActiveFilters = computed(() => Object.keys(route.query).length > 0);
</script>

<template>
  <div class="mx-16 my-4">
    <a-input-search
      v-model:value="searchValue"
      :loading="isLoading"
      placeholder="Find a Character"
      size="large"
      enter-button
      allow-clear
      @search="onSearch"
    />

    <CharacterFilters
      :clearable="hasActiveFilters"
      class="mt-4"
      @change="onFilterChange"
      @reset="resetFilters"
    />
    <Transition name="fade" appear>
      <main :key="route.query.page" class="mt-4">
        <div
          v-if="isError"
          class="flex flex-col items-center justify-center gap-4"
        >
          <img
            src="../assets/pickle-jar.png"
            alt="A weird looking pickle jar"
            class="max-h-56"
          />
          <span class="text-3xl font-medium">Try something else..</span>
        </div>

        <div v-if="isLoading" :class="$style.list">
          <a-card v-for="i in 20" :key="i" loading>...</a-card>
        </div>

        <div v-if="isSuccess" :class="$style.list">
          <CharacterCard
            v-for="character in characters.results"
            :key="character.id"
            :character="character"
          />
        </div>

        <div class="my-4">
          <a-pagination
            :current="currentPage"
            :total="characters.info.count"
            :show-total="
              (total, range) => `${range[0]}-${range[1]} of ${total} characters`
            "
            :default-page-size="20"
            :show-size-changer="false"
            @change="paginate"
          />
        </div>
      </main>
    </Transition>
  </div>
</template>

<style lang="scss" module>
.list {
  @apply grid gap-4 grid-cols-1 sm:grid-cols-1 md:grid-cols-5;
}

:global {
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 300ms;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
}
</style>
