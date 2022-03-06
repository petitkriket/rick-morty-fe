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

    <CharacterFilters
      @change="onFilterChange"
      @reset="resetFilters"
      :class="$style.filters"
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
              :character="character"
              v-for="character in characters"
              :key="character.id"
            />
          </div>

          <BasePager
            :class="$style.pager"
            :currentPage="$route.query.page"
            :pageCount="paginationInfo.pages"
            :hasPrevPage="!!paginationInfo.prev"
            :hasNextPage="!!paginationInfo.next"
            @prev="paginate('prev')"
            @next="paginate('next')"
          />
        </div>
      </main>
    </Transition>
  </div>
</template>

<script>
import _omitBy from "lodash.omitby";
import { mapActions } from "vuex";
import { FETCH_CHARACTERS } from "../store/modules/characters/actions";

import BaseSearchInput from "../components/BaseSearchInput.vue";
import BasePager from "../components/BasePager.vue";

import CharacterFilters from "../components/CharacterFilters.vue";
import CharacterCard from "../components/CharacterCard.vue";

export default {
  components: { BaseSearchInput, BasePager, CharacterCard, CharacterFilters },
  name: "CharactersPage",
  data() {
    return {
      characters: null,
      requestStatus: null,
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
    _omitBy,
    ...mapActions("characters", [FETCH_CHARACTERS]),
    onSearch(name) {
      this.onFilterChange({ name });
    },
    onFilterChange(params) {
      const query = this._omitBy(
        {
          ...this.$route.query,
          ...params,
        },
        (value) => [null, undefined, ""].includes(value)
      );

      this.$router.push({ query });
    },
    resetFilters() {
      this.$router.push({ query: {} });
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
      }
    },
  },
};
</script>

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
