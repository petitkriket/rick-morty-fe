<template>
  <span :class="$style.goBack">
    <button @click="backOrFallback">Go Back</button>
  </span>
</template>

<script>
export default {
  name: "BaseBackButton",
  props: {
    fallbackRoute: {
      type: String,
      default: "/",
    },
  },
  methods: {
    backOrFallback() {
      return this.hasHistory()
        ? this.$router.go(-1)
        : this.$router.push(this.fallbackRoute);
    },
    hasHistory() {
      return window.history.length > 2;
    },
  },
};
</script>

<style lang="scss" module>
.goBack {
  display: flex;
  cursor: pointer;

  button {
    padding: 8px;
    border: 0;
    cursor: pointer;
  }
}
</style>
