<template>
  <nav>
    <router-link to="/">Home</router-link>
    <router-link to="/characters">Characters</router-link>
  </nav>
</template>

<style lang="scss">
nav {
  @apply flex justify-center gap-4 py-4 shadow-sm sticky bg-white top-0 z-[1051];

  a {
    @apply text-neutral-800 font-semibold uppercase;
    &.router-link-exact-active {
      @apply font-thin text-black cursor-default;
    }
  }
}
</style>
