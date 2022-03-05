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

    <div :class="$style.cards">
      <CharacterCard
        :character="character"
        v-for="character in characters"
        :key="character.id"
      />
    </div>

    <div :class="$style.pagination">
      <p>It has a pagination</p>
    </div>
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
      filterParams: {
        name: "",
        status: "",
      },
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

      characterService
        .getAll(filterParams)
        .then((result) => {
          this.characters = result.data.results;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" module>
.charactersListPage {
  margin: 0 45px;

  .search {
    width: 100%;
  }

  .filters {
    margin-top: 8px;
  }

  .cards {
    margin-top: 16px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 16px;
  }

  .pagination {
    margin-top: 8px;
  }
}
</style>
