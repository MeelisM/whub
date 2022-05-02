<template>
  <div class="container">
    <div class="search">
      <div class="p-inputgroup">
        <span class="p-inputgroup-addon">
          <i class="pi pi-user"></i>
        </span>
        <InputText v-model="searchInput" placeholder="Username" class="input" />
        <router-link :to="'/player/' + searchInput"><Button label="Search" /></router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Search',
  data() {
    return {
      searchInput: '',
    };
  },
  methods: {
    //
  },
};
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .p-button {
    background: #1472ff;
    color: #ffffff;
    border-radius: 0px 3px 3px 0px;
  }

  .input {
    width: 40vw;
  }

  .p-inputgroup-addon {
    background: #1472ff;
    color: #ffffff;
  }

  .p-inputtext .p-inputgroup {
    border-radius: 3px 0px 0px 3px;
    border-color: #81d4fa;
  }
}
</style>
