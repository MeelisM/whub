<template>
  <div class="container">
    <div v-if="loading" class="spinner-container">
      <ProgressSpinner
        class="spinner"
        style="width: 6rem; height: 6rem"
        strokeWidth="5"
        fill="var(--surface-ground)"
        animationDuration=".5s"
      />
    </div>
    <DataTable
      :value="responseData.tankStats"
      class="p-datatable-sm"
      responsiveLayout="scroll"
      :autoLayout="true"
      :paginator="true"
      :rows="20"
      paginatorTemplate="CurrentPageReport  PrevPageLink PageLinks NextPageLink  RowsPerPageDropdown"
      :rowsPerPageOptions="[5, 10, 20, 50]"
      sortField="all.battles"
      :sortOrder="-1"
    >
      <Column class="field contour">
        <template #body="{ data }">
          <img :src="data.images.contour_icon" :alt="data.images.contour_icon" />
        </template>
      </Column>
      <Column class="field" field="short_name" header="Name" :sortable="true">
        <template #body="slotProps">
          <div :class="checkPremium(slotProps.data)">
            {{ slotProps.data.short_name }}
          </div>
        </template>
      </Column>
      <Column class="field nation" field="nation">
        <template #body="slotProps">
          <div :class="slotProps.data">
            <img class="img-nation" :src="'/' + slotProps.data.nation + '.png'" :alt="slotProps.data.nation" />
          </div>
        </template>
      </Column>
      <Column class="field" field="wn8" header="WN8" :sortable="true">
        <template #body="slotProps">
          <div>
            <Tag :class="wn8Colors(slotProps.data)" severity="success" value="Success" rounded>{{
              slotProps.data.wn8
            }}</Tag>
          </div>
        </template>
      </Column>
      <Column class="field battles" field="all.battles" header="Battles" :sortable="true"></Column>
      <Column class="field" field="avgWinRate" header="Winrate" :sortable="true">
        <template #body="slotProps">
          <div>{{ slotProps.data.avgWinRate.toFixed(2) }}%</div>
        </template>
      </Column>
      <Column class="field" field="avgDmg" header="DPG" :sortable="true">
        <template #body="slotProps">
          <div>
            {{ slotProps.data.avgDmg.toFixed(0) }}
          </div>
        </template>
      </Column>
      <Column class="field" field="all.battle_avg_xp" header="XP" :sortable="true"> </Column>
      <Column class="field" field="survived" header="Survived" :sortable="true">
        <template #body="slotProps">
          <div>{{ slotProps.data.survived.toFixed(2) }}%</div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script>
import DataService from '../service/DataService';

export default {
  name: 'Player',
  data() {
    return {
      winRate: null,
      loading: false,
      responseData: {
        tankStats: [],
        playerInfo: {
          username: '',
          accountId: null,
          clanId: null,
          globalRating: null,
          spotsTotal: null,
          spotsAvg: null,
          assistedAverage: null,
          hitsTotal: null,
          hitsPercent: null,
          xpMax: null,
          xpTotal: null,
          blockedAverage: null,
          capturePoints: null,
          defensePoints: null,
          defenseAvg: null,
          survivedBattles: null,
          kills: null,
          killsMax: null,
          killsAvg: null,
          damageDealt: null,
          damageReceived: null,
          damageMax: null,
          damageAvg: null,
          wins: null,
          losses: null,
          draws: null,
          battles: null,
          winRate: null,
        },
      },
    };
  },

  dataService: null,
  created() {
    this.dataService = new DataService();
  },
  mounted() {
    this.loading = true;
    const id = this.$route.params.id;
    this.dataService.getPlayerValues(id).then((data) => {
      (this.responseData = data), (this.loading = false);
    });
  },
  methods: {
    checkPremium(data) {
      return [
        {
          premium: data.is_premium == true,
        },
      ];
    },
    wn8Colors(data) {
      return [
        {
          'wn8-1': data.wn8 >= 2900,
          'wn8-2': data.wn8 < 2900 && data.wn8 >= 2450,
          'wn8-3': data.wn8 < 2450 && data.wn8 >= 2000,
          'wn8-4': data.wn8 < 2000 && data.wn8 >= 1600,
          'wn8-5': data.wn8 < 1600 && data.wn8 >= 1200,
          'wn8-6': data.wn8 < 1200 && data.wn8 >= 900,
          'wn8-7': data.wn8 < 900 && data.wn8 >= 650,
          'wn8-8': data.wn8 < 650 && data.wn8 >= 450,
          'wn8-9': data.wn8 < 450 && data.wn8 >= 300,
          'wn8-10': data.wn8 < 300,
        },
      ];
    },
  },
};
</script>

<style lang="scss">
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

.container {
  margin: auto;
  width: 80%;
  padding-bottom: 5rem;

  // .img-nation {
  //     border: 1px solid black;
  // }

  .spinner-container {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .battles {
    max-width: 4rem;
  }

  .premium {
    color: #ffa726;
  }

  .p-datatable .p-datatable-loading-icon {
    color: #ffa726;
  }

  .ussr {
    background-image: url('/ussr.png');
    height: 1.5rem;
    width: 1.5rem;
    background-size: contain;
    display: block;
  }

  .wn8-1 {
    background-color: #401070;
    color: #ffffff;
  }

  .wn8-2 {
    background-color: #793db6;
    color: #ffffff;
  }

  .wn8-3 {
    background-color: #3972c6;
    color: #ffffff;
  }

  .wn8-4 {
    background-color: #4099bf;
    color: #ffffff;
  }

  .wn8-5 {
    background-color: #4d7326;
    color: #ffffff;
  }

  .wn8-6 {
    background-color: #849b24;
    color: #ffffff;
  }

  .wn8-7 {
    background-color: #ccb800;
    color: #ffffff;
  }

  .wn8-8 {
    background-color: #cc7a00;
    color: #ffffff;
  }

  .wn8-9 {
    background-color: #cd3333;
    color: #ffffff;
  }

  .wn8-10 {
    background-color: #930d0d;
    color: #ffffff;
  }

  .p-tag {
    min-width: 4rem;
  }
}

@media only screen and (min-width: 600px) {
  .container {
    margin: auto;
    max-width: 80%;
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
