<template>
  <div class="app">
    <div class="sidebar-container">
      <SideBar />
    </div>
    <div class="main-container">
      <RouterView />
    </div>
  </div>
</template>

<script>
import SideBar from '@/components/SideBar.vue';
import { RouterView } from 'vue-router';

export default {
  components: {
    SideBar,
    RouterView,
  },
};
</script>

<style lang="scss">
:root {
  font: 14px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  --text-primary: black;
  --text-secondary: grey;
  --bg-dark: #010312;
  --bg-light: rgb(223, 223, 223);

  // Firefox scrollbar
  scrollbar-color: var(--bg-dark) var(--bg-light);
  scrollbar-width: thin;

  // Other browsers scrollbar
  body::-webkit-scrollbar {
    width: 0.5rem;
  }

  body::-webkit-scrollbar-track {
    background: var(--bg-dark);
  }

  body::-webkit-scrollbar-thumb {
    background: var(--bg-light);
  }
}

* {
  text-decoration: none;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: rgb(24, 24, 24);
}

@media only screen and (min-width: 600px) {
  .main-container {
    flex: 1;
    margin: 0rem 6rem;
  }
}

@media only screen and (max-width: 600px) {
}
</style>
