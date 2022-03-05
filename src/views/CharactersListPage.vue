<template>
  <div :class="$style.charactersListPage">
    <div :class="$style.search">
      <BaseSearchInput
        placeholder="Search for a Character"
        v-model="filterParams.name"
      />
    </div>

    <div :class="$style.filters">
      <CharacterFilters @change="onFilterChange" />
    </div>

    <main>
      <div v-if="requestStatus === 'loading'">Me Seeks</div>

      <div v-if="requestStatus === 'error'" :class="$style.noResults">
        <img src="../assets/pickle-jar.png" alt="A weird looking pickle jar" />
        <h3>No Result..</h3>
      </div>

      <div v-if="requestStatus === 'success'" :class="$style.cards">
        <CharacterCard
          :character="character"
          v-for="character in characters"
          :key="character.id"
        />
      </div>

      <div :class="$style.pagination">
        <button v-if="paginationInfo.prev" @click="paginate('prev')">
          Previous Page
        </button>

        <button v-if="paginationInfo.next" @click="paginate('next')">
          Next Page
        </button>
      </div>
    </main>
  </div>
</template>

<script>
import { characterService } from "../services/models/character";

import BaseSearchInput from "../components/BaseSearchInput.vue";

import CharacterFilters from "../components/CharacterFilters.vue";
import CharacterCard from "../components/CharacterCard.vue";

export default {
  components: { BaseSearchInput, CharacterCard, CharacterFilters },
  name: "CharactersListPage",
  data() {
    return {
      characters: null,
      requestStatus: "loading",
      filterParams: {},
      paginationInfo: {},
    };
  },
  watch: {
    filterParams: {
      handler() {
        this.getCharacters();
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    onFilterChange(updatedFilters) {
      this.filterParams = {
        ...this.filterParams,
        ...updatedFilters,
      };
    },
    getCharacters() {
      const { filterParams } = this;
      this.requestStatus = "loading";

      characterService
        .getAll(filterParams)
        .then((result) => {
          this.characters = result.data.results;
          this.paginationInfo = result.data.info;
          this.requestStatus = "success";
        })
        .catch((err) => {
          this.requestStatus = "error";
          console.log(err);
        });
    },
    paginate(direction) {
      const url = this.paginationInfo[direction];

      if (url) {
        const params = Object.fromEntries(
          new URLSearchParams(url.split("?")[1])
        );

        this.onFilterChange(params);
        this.scrollToTop();
      }
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
};
</script>

<style lang="scss" module>
.charactersListPage {
  margin: 0 45px;
  scroll-behavior: smooth;

  .search {
    width: 100%;
  }

  .filters {
    margin-top: 8px;
  }

  main {
    margin-top: 16px;
    .cards {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      grid-auto-rows: auto;
      grid-gap: 16px;
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

  .pagination {
    display: flex;
    justify-content: flex-end;
    gap: 16px;
    margin-top: 16px;
  }
}
</style>
