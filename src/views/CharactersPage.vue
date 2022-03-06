<template>
  <div :class="$style.charactersListPage">
    <div :class="$style.search">
      <BaseSearchInput
        :value="$route.query.name"
        placeholder="Search for a Character"
        @input="onSearch"
      />
      <button :class="$style.submit">Search</button>
    </div>

    <div :class="$style.filters">
      <CharacterFilters @change="onFilterChange" />
    </div>

    <main>
      <div v-if="requestStatus === 'loading'">Me Seeks..</div>

      <div v-if="requestStatus === 'error'" :class="$style.noResults">
        <img src="../assets/pickle-jar.png" alt="A weird looking pickle jar" />
        <h3>No Result..</h3>
      </div>

      <template v-if="requestStatus === 'success'">
        <div :class="$style.cards">
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
      </template>
    </main>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { FETCH_CHARACTERS } from "../store/modules/characters/actions";

import BaseSearchInput from "../components/BaseSearchInput.vue";

import CharacterFilters from "../components/CharacterFilters.vue";
import CharacterCard from "../components/CharacterCard.vue";

export default {
  components: { BaseSearchInput, CharacterCard, CharacterFilters },
  name: "CharactersPage",
  data() {
    return {
      characters: null,
      requestStatus: "loading",
      filterParams: {},
      paginationInfo: {},
    };
  },
  watch: {
    "$route.query": {
      handler() {
        this.getCharacters();
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    ...mapActions("characters", [FETCH_CHARACTERS]),
    onSearch(name) {
      this.onFilterChange({ name });
    },
    onFilterChange(params) {
      const query = {
        ...this.$route.query,
        ...params,
      };

      this.$router.push({ query });
    },
    getCharacters() {
      const { query } = this.$route;
      this.requestStatus = "loading";

      this[FETCH_CHARACTERS](query)
        .then((result) => {
          this.characters = result.data.results;
          this.paginationInfo = result.data.info;
          this.requestStatus = "success";
        })
        .catch(() => {
          this.requestStatus = "error";
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

  .search {
    display: flex;
    gap: 4px;

    .submit {
      background: #42b983;
      color: white;
      border: 1px solid #42b983;
    }
  }

  .filters {
    margin-top: 16px;
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
