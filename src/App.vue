<template>
  <div class="app">
    <div class="sidebar-container">
      <SideBar />
    </div>
    <div class="content-container">
      <RouterView />
    </div>
  </div>
</template>

<script>
import SideBar from "@/components/SideBar.vue";
import { RouterView } from "vue-router";

export default {
  components: {
    SideBar,
    RouterView,
  },
};
</script>

<style lang="scss">
:root {
  font: 14px "Segoe UI", sans-serif;
  --text-dark: #1472ff;
  --text-light: #dedede;
  --bg-light: #1472ff;
}

* {
  text-decoration: none;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: #181818;

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

  .premium {
    color: #ffa726;
  }

  .tank-type {
    height: 28px;
    width: 24px;
  }

  .p-tag {
    background: var(--text-dark);
    display: inline-flex;
    color: #ffffff;
    min-width: 4rem;
  }

  .p-datatable .p-column-header-content {
    justify-content: center;
  }

  .p-datatable .p-datatable-tbody > tr {
    td {
      text-align: center;
      border: 1px solid #484848;
    }
  }

  .p-datatable .p-datatable-thead > tr > th {
    border: none;
  }

  .p-datatable .p-sortable-column.p-highlight {
    background: var(--text-dark);
    color: #ffffff;
  }

  .p-paginator .p-paginator-pages .p-paginator-page.p-highlight {
    background: var(--text-dark);
    color: #ffffff;
  }

  .p-datatable .p-sortable-column.p-highlight .p-sortable-column-icon {
    color: #ffffff;
  }

  .nation-icon {
    box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
      rgba(0, 0, 0, 0.22) 0px 15px 12px;
    border: solid 1px #484848;
  }
}

@media only screen and (max-width: 600px) {
  .container {
    width: 100%;
    padding-bottom: 5rem;
  }
}
@media only screen and (min-width: 600px) {
  .container {
    width: 80%;
    margin: auto;
  }
}
</style>
