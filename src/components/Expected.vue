<template>
  <div class="container">
    <DataTable
      :value="tableData"
      class="p-datatable-sm"
      responsiveLayout="scroll"
      :paginator="true"
      :rows="10"
      paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
      :rowsPerPageOptions="[10, 20, 50]"
      sortField="expDamage"
      :sortOrder="-1"
    >
      <Column class="field icon">
        <template #body="{ data }">
          <img :src="data.images.contour_icon" :alt="data.images.contour_icon" />
        </template>
      </Column>
      <Column field="short_name" header="Name" :sortable="true">
        <template #body="slotProps">
          <div :class="checkIfPremium(slotProps.data)">
            {{ slotProps.data.short_name }}
          </div>
        </template>
      </Column>
      <Column field="nation" header="Nation" :sortable="true" class="field nation"></Column>
      <Column field="tier" header="Tier" :sortable="true" class="field tier"></Column>
      <Column field="expDamage" header="eDamage" :sortable="true"></Column>
      <Column field="expFrag" header="eFrag" :sortable="true"></Column>
      <Column field="expSpot" header="eSpot" :sortable="true"></Column>
      <Column field="expDef" header="eDef" :sortable="true"></Column>
      <Column field="expWinRate" header="eWinrate" :sortable="true"></Column>
    </DataTable>
  </div>
</template>

<script>
import DataService from '../service/DataService';

export default {
  name: 'Expected',
  data() {
    return {
      tableData: null,
    };
  },
  dataService: null,
  created() {
    this.dataService = new DataService();
  },
  mounted() {
    this.dataService.getExpectedValues().then((data) => (this.tableData = data));
  },

  methods: {
    checkIfPremium(data) {
      return [
        {
          short_name: data.is_premium == true,
        },
      ];
    },
  },
};
</script>

<style lang="scss">
@media only screen and (min-width: 600px) {
  .container {
    margin: auto;
    width: 70%;
  }

  .short_name {
    color: #ffa726;
  }
}

@media only screen and (max-width: 600px) {
  .container {
    width: 100%;
  }
}

// .tier,
// .icon,
// .nation {
//     width: 120px;
// }
</style>
