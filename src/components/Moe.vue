<template>
  <div v-if="loading" class="spinner-container">
    <ProgressSpinner
      class="spinner"
      style="width: 6rem; height: 6rem"
      strokeWidth="5"
      fill="var(--surface-ground)"
      animationDuration=".5s"
    />
  </div>
  <div v-if="!loading" class="container">
    <Divider>
      <span class="p-tag">Marks of Excellence</span>
    </Divider>
    <DataTable
      :value="tableData"
      class="p-datatable-sm"
      responsiveLayout="scroll"
      :paginator="true"
      :rows="10"
      paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
      :rowsPerPageOptions="[10, 20, 50]"
      sortField="marks.95"
      :sortOrder="-1"
    >
      <Column class="field icon">
        <template #body="{ data }">
          <img
            :src="data.images.contour_icon"
            :alt="data.images.contour_icon"
          />
        </template>
      </Column>
      <Column class="field tank-type" field="nation" header="Class">
        <template #body="slotProps">
          <div :class="slotProps.data">
            <img
              class="tank-type"
              :src="'/type/' + slotProps.data.type + '.png'"
              :alt="slotProps.data.type"
            />
          </div>
        </template>
      </Column>
      <Column field="short_name" header="Name" :sortable="true">
        <template #body="slotProps">
          <div :class="checkIfPremium(slotProps.data)">
            {{ slotProps.data.short_name }}
          </div>
        </template>
      </Column>
      <Column class="field nation" field="nation" header="Nation">
        <template #body="slotProps">
          <div :class="slotProps.data">
            <img
              class="nation-icon"
              :src="'/' + slotProps.data.nation + '.png'"
              :alt="slotProps.data.nation"
            />
          </div>
        </template>
      </Column>
      <Column
        field="tier"
        header="Tier"
        :sortable="true"
        class="field tier"
      ></Column>
      <Column field="marks.65" header="65%" :sortable="true"></Column>
      <Column field="marks.85" header="85%" :sortable="true"></Column>
      <Column field="marks.95" header="95%" :sortable="true"></Column>
      <Column field="marks.100" header="100%" :sortable="true"></Column>
    </DataTable>
  </div>
</template>

<script>
import DataService from "../service/DataService";

export default {
  name: "Moe",
  data() {
    return {
      tableData: null,
      loading: false,
    };
  },
  dataService: null,
  created() {
    this.dataService = new DataService();
  },
  mounted() {
    this.loading = true;
    this.dataService.getMoeValues().then((data) => {
      (this.tableData = data), (this.loading = false);
    });
  },

  methods: {
    checkIfPremium(data) {
      return [
        {
          premium: data.is_premium == true,
        },
      ];
    },
  },
};
</script>
