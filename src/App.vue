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

import SideBar from "@/components/SideBar.vue";
import { RouterView } from "vue-router"

export default {
  components: {
    SideBar,
    RouterView
  }
}



</script>

<style lang="scss">
:root {
  --text-primary: black;
  --text-secondary: grey;
  --bg-dark: #010312;
  --bg-light: #ffffff;
  font-size: 16px;

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
    background: var(--bg-light)
  }
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  background-color: white;
  // without height, bgcolor works fully when dealing with extremely large table
  height: 100vh;
}



@media only screen and (min-width: 600px) {
  .main-container {
    flex: 1;
    margin: 0rem 6rem;
  }
}

@media only screen and (max-width: 600px) {}
</style>