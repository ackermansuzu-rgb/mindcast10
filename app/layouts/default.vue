<template>
  <v-app class="mind-cast-app">
    <AppHeader />
    <v-main class="page-main">
      <slot />
    </v-main>
    <AppFooter />
  </v-app>
</template>

<style>
html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  background: #061310;
  color:
    #f5fff9;
  font-family: Arial, Helvetica, sans-serif;
}

.mind-cast-app {
  min-height: 100vh;
  background:
    #061310;
}

.page-main {
  display: flex;
  flex: 1 0 auto;
  flex-direction: column;
}

::selection {
  background: #087f5b;
  color: #f5fff9;
}
</style>