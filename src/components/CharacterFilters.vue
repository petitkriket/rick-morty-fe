<template>
  <div :class="$style.container">
    <div :class="$style.criterias">
      <div :class="$style.filter">
        Status
        <select @change="onChange('status', $event.target.value)">
          <option
            v-for="statusOption in healthStatusOptions"
            :key="statusOption.value"
            :value="statusOption.value"
            :selected="form.status === statusOption.value"
          >
            {{ statusOption.label }}
          </option>
        </select>
      </div>

      <div :class="$style.filter">
        Gender
        <select @change="onChange('gender', $event.target.value)">
          <option
            v-for="statusOption in genderOptions"
            :key="statusOption.value"
            :value="statusOption.value"
            :selected="form.gender === statusOption.value"
          >
            {{ statusOption.label }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CharacterFilters",
  computed: {
    healthStatusOptions() {
      return [
        { value: null, label: "Any" },
        { value: "alive", label: "Alive" },
        { value: "dead", label: "Dead" },
        { value: "unknown", label: "Unknown" },
      ];
    },
    genderOptions() {
      return [
        { value: null, label: "Any" },
        { value: "Female", label: "Female" },
        { value: "Male", label: "Male" },
        { value: "Genderless", label: "genderless" },
        { value: "Unknown", label: "unknown" },
      ];
    },
  },
  data() {
    return {
      form: {
        gender: null,
        status: null,
      },
    };
  },
  methods: {
    onChange(field, value) {
      this.form[field] = value;
      this.$emit("change", { [field]: value });
    },
  },
};
</script>

<style lang="scss" module>
.container {
  border: 1px solid #ccc;
  background: #f1f1f1;
  border-radius: 4px;
  padding: 16px;

  .criterias {
    display: flex;
    justify-content: flex-start;
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
