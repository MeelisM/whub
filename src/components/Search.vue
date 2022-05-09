<template>
  <div class="container">
    <div class="search">
      <div class="p-inputgroup">
        <span class="p-inputgroup-addon">
          <i class="pi pi-user"></i>
        </span>
        <InputText
          v-model="searchInput"
          placeholder="Enter player name"
          class="input"
        />
        <Button @click="getPlayer" label="Search" />
      </div>
    </div>
  </div>
</template>

<script>
import DataService from "../service/DataService";

export default {
  name: "Search",
  data() {
    return {
      searchInput: "",
      userId: null,
    };
  },
  dataService: null,

  created() {
    this.dataService = new DataService();
  },

  methods: {
    async getPlayer() {
      this.dataService.getPlayerId(this.searchInput).then((data) => {
        this.userId = data.data[0].account_id;
        this.$router.push(`/player/${this.userId}`);
      });
    },
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
    background: var(--bg-light);
    color: #ffffff;
    border-radius: 0px 3px 3px 0px;
  }

  .input {
    width: 25vw;
  }

  .p-inputgroup-addon {
    background: var(--bg-light);
    color: #ffffff;
  }
}

@media only screen and (max-width: 600px) {
  .container {
    .input {
      width: 75%;
    }
  }
}
</style>
