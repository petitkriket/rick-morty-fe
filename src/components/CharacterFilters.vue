<script setup>
import { defineEmits, defineProps } from "vue";
const emit = defineEmits(["reset", "change"]);

const reset = () => emit("reset");
const updateFilter = (field, value) =>
  emit("change", { [field]: value, page: "" });

const props = defineProps({
  clearable: {
    type: Boolean,
    default: false,
  },
});

const healthStatusOptions = [
  { value: "", label: "Any" },
  { value: "alive", label: "Alive" },
  { value: "dead", label: "Dead" },
  { value: "unknown", label: "Unknown" },
];

const genderOptions = [
  { value: "", label: "Any" },
  { value: "female", label: "Female" },
  { value: "male", label: "Male" },
  { value: "genderless", label: "Genderless" },
  { value: "unknown", label: "Unknown" },
];
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.criterias">
      <div :class="$style.filter">
        Status
        <select @change="updateFilter('status', $event.target.value)">
          <option
            v-for="statusOption in healthStatusOptions"
            :key="statusOption.value"
            :value="statusOption.value"
            :selected="$route.query.status === statusOption.value"
          >
            {{ statusOption.label }}
          </option>
        </select>
      </div>

      <div :class="$style.filter">
        Gender
        <select @change="updateFilter('gender', $event.target.value)">
          <option
            v-for="statusOption in genderOptions"
            :key="statusOption.value"
            :value="statusOption.value"
            :selected="$route.query.gender === statusOption.value"
          >
            {{ statusOption.label }}
          </option>
        </select>
      </div>

      <button :disabled="!props.clearable" @click="reset">Clear filters</button>
    </div>
  </div>
</template>

<style lang="scss" module>
.container {
  border: 1px solid #ccc;
  background: #f1f1f1;
  border-radius: 4px;
  padding: 16px;

  .criterias {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    gap: 64px;
    padding: 8px;

    .filter {
      display: flex;
      flex-direction: row;
      gap: 8px;
    }
  }
}
</style>
