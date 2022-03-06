<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/characters">Characters</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
html,
body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#nav {
  padding: 12px 0;

  a {
    font-weight: bold;
    color: #383838;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
