<template>
  <div id="app">
    <the-top-nav />
    <main>
      <router-view />
    </main>
  </div>
</template>

<style lang="scss">
#app {
  @apply flex flex-col;
}
</style>
