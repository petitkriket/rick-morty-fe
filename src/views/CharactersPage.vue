<script setup>
import BaseSearchInput from "../components/BaseSearchInput.vue";
import BasePager from "../components/BasePager.vue";

import CharacterFilters from "../components/CharacterFilters.vue";
import CharacterCard from "../components/CharacterCard.vue";

// TODO: create a composable
import _omitBy from "lodash.omitby";
import { characterService } from "../services/models/character";

import { ref, onBeforeMount, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const characters = ref(null);
const requestStatus = ref(null);
const paginationInfo = ref({});

const router = useRouter();
const route = useRoute();

const onSearch = (name) => onFilterChange({ name });
const resetFilters = () => router.push({ query: {} });

onBeforeMount(async () => getCharacters());

watch(
  () => route.query,
  async () => getCharacters()
);

const getCharacters = async () => {
  requestStatus.value = "loading";

  characterService
    .getAll(route.query)
    .then((result) => {
      characters.value = result.data.results;
      paginationInfo.value = result.data.info;
      requestStatus.value = "success";
    })
    .catch(() => {
      requestStatus.value = "error";
    });
};

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

const paginate = (direction) => {
  const url = paginationInfo.value[direction];
  if (!url) return;

  const params = Object.fromEntries(new URLSearchParams(url.split("?")[1]));
  onFilterChange(params);
};
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
      :class="$style.filters"
      @change="onFilterChange"
      @reset="resetFilters"
    />

    <Transition name="fade" appear>
      <main :key="paginationInfo.next">
        <div v-if="requestStatus === 'loading'"></div>

        <div v-if="requestStatus === 'error'" :class="$style.noResults">
          <img
            src="../assets/pickle-jar.png"
            alt="A weird looking pickle jar"
          />
          <h3>No Result..</h3>
        </div>

        <div v-if="requestStatus === 'success'">
          <p>{{ characters.length }} of {{ paginationInfo.count }} results</p>
          <div :class="$style.cards">
            <CharacterCard
              v-for="character in characters"
              :key="character.id"
              :character="character"
            />
          </div>

          <BasePager
            :class="$style.pager"
            :current-page="$route.query.page"
            :page-count="paginationInfo.pages"
            :has-prev-page="!!paginationInfo.prev"
            :has-next-page="!!paginationInfo.next"
            @prev="paginate('prev')"
            @next="paginate('next')"
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
