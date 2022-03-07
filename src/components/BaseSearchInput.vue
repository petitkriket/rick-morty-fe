<template>
  <div :class="$style.baseSearchInput">
    <input
      v-model="model"
      type="text"
      v-bind="$attrs"
      :class="$style.input"
      v-on="listeners"
    />
  </div>
</template>

<script>
export default {
  name: "BaseSearchInput",
  props: {
    value: {
      type: [String, Number],
      default: "",
    },
  },
  emits: ["input", "focus", "blur"],
  data() {
    return {
      model: this.value,
    };
  },
  computed: {
    listeners() {
      return {
        ...this.$attrs,
        input: this.updateValue,
        focus: this.onFocus,
        blur: this.onBlur,
      };
    },
  },
  watch: {
    value(value) {
      this.model = value;
    },
  },
  methods: {
    updateValue(event) {
      this.$emit("input", event.target.value.toLowerCase());
    },
    onFocus(value) {
      this.$emit("focus", value);
    },
    onBlur(value) {
      this.$emit("blur", value);
    },
  },
};
</script>

<style lang="scss" module>
.baseSearchInput {
  .input {
    padding: 8px;
  }
}
</style>
