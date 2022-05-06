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

  .spinner-container {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .p-divider {
    .p-divider-content {
      background: none;
    }
  }

  .tank-type {
    height: 28px;
    width: 24px;
  }

  .premium {
    color: #ffa726;
  }

  .p-tag {
    background: #1472ff;
    color: #ffffff;
    min-width: 4rem;

    &.general {
      display: none;
    }
  }

  .p-datatable .p-column-header-content {
    justify-content: center;
  }

  .p-datatable .p-datatable-tbody > tr > td {
    text-align: center;
    border: 1px solid #484848;
  }

  .p-datatable .p-datatable-thead > tr > th {
    border: none;
  }

  .p-datatable .p-sortable-column.p-highlight {
    background: #4891ff;
    color: #ffffff;
  }

  .p-paginator .p-paginator-pages .p-paginator-page.p-highlight {
    background: #1472ff;
    color: #ffffff;
  }

  .p-datatable .p-sortable-column.p-highlight .p-sortable-column-icon {
    color: #ffffff;
  }

  .nation-icon {
    box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
    border: solid 1px #484848;
  }
}

@media only screen and (max-width: 600px) {
  .container {
    width: 100%;
    padding-bottom: 5rem;

    .general-stats {
      display: flex;
    }
  }
}
@media only screen and (min-width: 600px) {
  .container {
    width: 80%;
    margin: auto;

    .general-stats {
      display: none;
    }
    .main-container {
      margin-left: 2rem;
    }
  }
}
</style>
