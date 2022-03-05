<template>
  <div :class="$style.baseSearchInput">
    <input type="text" v-bind="$attrs" v-on="listeners" :class="$style.input" />
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
  data() {
    return {
      focused: null,
    };
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: this.updateValue,
        focus: this.onFocus,
        blur: this.onBlur,
      };
    },
  },
  methods: {
    updateValue(event) {
      this.$emit("input", event.target.value);
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
