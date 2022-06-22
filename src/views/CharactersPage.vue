<script setup>
import BaseSearchInput from "../components/BaseSearchInput.vue";
import BasePager from "../components/BasePager.vue";

import CharacterFilters from "../components/CharacterFilters.vue";
import CharacterCard from "../components/CharacterCard.vue";

import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import _omitBy from "lodash.omitby";

import { useCharactersQuery } from "../queries/character";

const router = useRouter();
const route = useRoute();

const queryParams = computed(() => route.query);

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

const onSearch = (name) => onFilterChange({ name });
const paginate = (url) =>
  onFilterChange(Object.fromEntries(new URLSearchParams(url.split("?")[1])));
const resetFilters = () => router.push({ query: {} });
const hasActiveFilters = computed(() => Object.keys(route.query).length > 0);
</script>

<template>
  <div :class="$style.charactersListPage">
    <div :class="$style.search">
      <BaseSearchInput
        :model-value="route.query.name"
        placeholder="Search for a Character"
        @update:model-value="onSearch"
      />
      <button :class="$style.submit">Search</button>
    </div>

    <CharacterFilters
      :clearable="hasActiveFilters"
      :class="$style.filters"
      @change="onFilterChange"
      @reset="resetFilters"
    />
    <Transition name="fade" appear>
      <main :key="route.query.page">
        <div v-if="isLoading">Loading...</div>

        <div v-if="isError" :class="$style.noResults">
          <img
            src="../assets/pickle-jar.png"
            alt="A weird looking pickle jar"
          />
          <h3>No Results...</h3>
        </div>

        <div v-if="isSuccess">
          <p>
            {{ characters.results.length }} of
            {{ characters.info.count }} results
          </p>
          <div :class="$style.cards">
            <CharacterCard
              v-for="character in characters.results"
              :key="character.id"
              :character="character"
            />
          </div>

          <BasePager
            :class="$style.pager"
            :current-page="$route.query.page"
            :page-count="characters.info.pages"
            :has-prev-page="!!characters.info.prev"
            :has-next-page="!!characters.info.next"
            @prev="paginate(characters.info.prev)"
            @next="paginate(characters.info.next)"
          />
        </div>
      </main>
    </Transition>
  </div>
</template>

<style lang="scss" module>
.charactersListPage {
  margin: 16px 64px 0;

  @media (max-width: 768px) {
    margin: 16px 16px 0;
  }

  .search {
    display: flex;
    gap: 4px;

    .submit {
      cursor: pointer;
      background: #42b983;
      color: white;
      border: 0;
    }
  }

  .filters {
    margin-top: 16px;
  }

  main {
    margin-top: 16px;

    .cards {
      display: grid;
      grid-template-columns: repeat(6, minmax(0, 1fr));
      grid-auto-rows: auto;
      grid-gap: 16px;

      @media (max-width: 768px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      @media (max-width: 480px) {
        grid-template-columns: repeat(1, minmax(0, 1fr));
      }
    }

    .noResults {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      img {
        height: 200px;
      }
    }
  }

  .pager {
    margin-top: 16px;
  }
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
