<template>
  <div class="container">
    <div class="main-container">
      <div class="profile">
        <div class="profile-second">
          <div class="container-one">
            <img class="clan logo" :src="clanData.clan.emblems.x195.portal" alt="Clan logo" />
          </div>
          <div class="container-two">
            <div class="clan playername">{{ responseData.playerInfo.username }}</div>
            <div class="clan tag">[{{ clanData.clan.tag }}]</div>
            <div class="clan joined">
              Joined:
              {{
                new Date(clanData.joined_at * 1000).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })
              }}
            </div>
            <div class="clan role">{{ clanData.role_i18n }}</div>
          </div>
        </div>
        <div class="container-three">
          <table>
            <tr>
              <td>Line 1 Line 1 Line 1 Line 1</td>
              <td>Line 1 Line 1 Line 1 Line 1</td>
              <td>Line 1 Line 1 Line 1 Line 1</td>
            </tr>

            <tr>
              <td>Line 2 Line 2 Line 2 Line 2</td>
              <td>Line 2 Line 2 Line 2 Line 2</td>
              <td>Line 2 Line 2 Line 2 Line 2</td>
            </tr>
          </table>
        </div>
      </div>

      <Divider align="left">
        <span class="p-tag">Graphs</span>
      </Divider>

      <div class="graph-container">
        <div class="graphic">
          <Chart type="line" :data="multiAxisChart" :options="multiAxisOptions" />
        </div>
        <div class="graphic">
          <Chart type="bar" :data="barChartData" :options="barChartOptions" />
        </div>
      </div>
      <Divider align="left">
        <span class="p-tag">Tanks Data</span>
      </Divider>

      <div v-if="loading" class="spinner-container">
        <ProgressSpinner
          class="spinner"
          style="width: 6rem; height: 6rem"
          strokeWidth="5"
          fill="var(--surface-ground)"
          animationDuration=".5s"
        />
        <p class="loading-msg">Loading data table...</p>
      </div>

      <DataTable
        v-if="!loading"
        :value="responseData.tankStats"
        class="p-datatable-sm"
        responsiveLayout="scroll"
        :autoLayout="true"
        :paginator="true"
        :rows="10"
        paginatorTemplate="CurrentPageReport  PrevPageLink PageLinks NextPageLink  RowsPerPageDropdown"
        :rowsPerPageOptions="[5, 10, 20, 50]"
        sortField="avgDmg"
        :sortOrder="-1"
      >
        <Column class="field contour" field="images.contour_icon" header="Icon">
          <template #body="{ data }">
            <img :src="data.images.contour_icon" :alt="data.images.contour_icon" />
          </template>
        </Column>
        <Column class="field tank-type" field="nation" header="Class">
          <template #body="slotProps">
            <div :class="slotProps.data">
              <img class="tank-type" :src="'/type/' + slotProps.data.type + '.png'" :alt="slotProps.data.type" />
            </div>
          </template>
        </Column>
        <Column class="field" field="short_name" header="Name" :sortable="true">
          <template #body="slotProps">
            <div :class="checkPremium(slotProps.data)">
              {{ slotProps.data.short_name }}
            </div>
          </template>
        </Column>
        <Column class="field nation" field="nation" header="Nation">
          <template #body="slotProps">
            <div :class="slotProps.data">
              <img class="nation-icon" :src="'/' + slotProps.data.nation + '.png'" :alt="slotProps.data.nation" />
            </div>
          </template>
        </Column>
        <Column class="field" field="wn8" header="WN8" :sortable="true">
          <template #body="slotProps">
            <div>
              <Tag :class="wn8Colors(slotProps.data)" severity="success" rounded>{{ slotProps.data.wn8 }}</Tag>
            </div>
          </template>
        </Column>
        <Column class="field battles" field="all.battles" header="Battles" :sortable="true"></Column>
        <Column class="field" field="avgWinRate" header="Winrate" :sortable="true">
          <template #body="slotProps">
            <div>
              <Tag :class="winRateColors(slotProps.data)" severity="success" rounded>
                {{ slotProps.data.avgWinRate.toFixed(2) }}%</Tag
              >
            </div>
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
        <Column class="field tank-type" field="mark_of_mastery" header="Badge" :sortable="true">
          <template #body="slotProps">
            <div :class="checkMarks(slotProps.data)">
              <img
                class="img-mastery"
                :src="'/mastery/' + slotProps.data.mark_of_mastery + '.png'"
                :alt="slotProps.data.mark_of_mastery"
              />
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script>
import DataService from '../service/DataService';

export default {
  name: 'Player',
  data() {
    return {
      barChartData: {
        labels: ['Loading data...'],
        datasets: [
          {
            label: 'Vehicles:',
            backgroundColor: '#42A5F5',
            data: [65, 59, 80, 81, 56, 55, 40],
          },
        ],
      },
      barChartOptions: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
            labels: {
              color: '#495057',
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: '#495057',
            },
            grid: {
              color: '#ebedef',
            },
          },
          y: {
            ticks: {
              color: '#495057',
            },
            grid: {
              color: '#ebedef',
            },
          },
        },
      },

      multiAxisChart: {
        labels: [],
        datasets: [
          {
            label: 'wn8',
            fill: false,
            borderColor: '#42A5F5',
            yAxisID: 'y',
            tension: 0.4,
            data: [],
          },
          {
            label: 'winrate',
            fill: false,
            borderColor: '#00bb7e',
            yAxisID: 'y1',
            tension: 0.4,
            data: [],
          },
        ],
      },
      multiAxisOptions: {
        stacked: false,
        plugins: {
          legend: {
            labels: {
              color: '#495057', // title color
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: '#495057',
            },
            grid: {
              color: '#ebedef',
            },
          },
          y: {
            type: 'linear',
            display: true,
            position: 'left',
            ticks: {
              color: '#495057', // wn8 color
            },
            grid: {
              color: '#ebedef',
            },
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            ticks: {
              color: '#495057', // winrate color
            },
            grid: {
              drawOnChartArea: false,
              color: '#ebedef',
            },
          },
        },
      },
      loading: false,
      clanData: {
        clan: {
          name: '',
          color: '',
          created_at: null,
          tag: '',
          emblems: {
            x64: {
              portal: '',
            },
            x195: {
              portal: '',
            },
            x256: {
              wowp: '',
            },
          },
        },
        role_i18n: '',
        joined_at: null,
      },
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
          wn8: null || 0,
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

      const graphData = {
        playerId: this.responseData.playerInfo.accountId,
        battles: this.responseData.playerInfo.battles,
        wn8: this.responseData.playerInfo.wn8,
        winrate: this.responseData.playerInfo.winRate,
      };

      this.dataService.postGraphValues(graphData);

      ////////////////////////////////////////////////////////////
      // TIER STATISTICS

      const tanksData = this.responseData.tankStats;
      const tanksAmountPerTier = Object.entries(
        tanksData.reduce((acc, { tier }) => {
          acc[tier] = (acc[tier] || 0) + 1;
          return acc;
        }, {})
      ).map(([key, value]) => ({ tier: key, amount: value }));

      const amountOfTanksArray = tanksAmountPerTier.map(({ amount }) => amount);
      const tierNumberArray = tanksAmountPerTier.map(({ tier }) => tier);

      const tierNumberArrayPrefix = tierNumberArray.map((i) => 'tier ' + i);

      this.barChartData.labels = tierNumberArrayPrefix;
      this.barChartData.datasets[0].data = amountOfTanksArray;

      console.log('AMOUNT OF TANKS', amountOfTanksArray);
      console.log('TIERS OF TANKS', tierNumberArray);
    });

    //
    ////////////////////////////////////////////////////////////

    this.dataService.getPlayerClan(id).then((data) => {
      this.clanData = data.data[id];
    });

    this.dataService.getGraphValues(id).then((data) => {
      this.multiAxisChart.labels = data.data[0].battles;
      this.multiAxisChart.datasets[0].data = data.data[0].wn8;
      this.multiAxisChart.datasets[1].data = data.data[0].winrate;
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
    checkMarks(data) {
      return [
        {
          'img-mastery-none': data.mark_of_mastery === 0,
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

    winRateColors(data) {
      return [
        {
          'wr-1': data.avgWinRate >= 65,
          'wr-2': data.avgWinRate < 65 && data.avgWinRate >= 60,
          'wr-3': data.avgWinRate < 60 && data.avgWinRate >= 56,
          'wr-4': data.avgWinRate < 56 && data.avgWinRate >= 54,
          'wr-5': data.avgWinRate < 54 && data.avgWinRate >= 52,
          'wr-6': data.avgWinRate < 52 && data.avgWinRate >= 50,
          'wr-7': data.avgWinRate < 50 && data.avgWinRate >= 48,
          'wr-8': data.avgWinRate < 48 && data.avgWinRate >= 47,
          'wr-9': data.avgWinRate < 47 && data.avgWinRate >= 46,
          'wr-10': data.avgWinRate < 46,
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

  .loading-msg {
    color: #ffffff;
  }

  .clan-logo {
    width: 128px;
    height: 128px;
    margin-right: 2rem;
  }

  .nation-icon {
    box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
    border: solid 1px #484848;
  }

  .tank-type {
    height: 28px;
    width: 24px;
  }

  .img-mastery-none {
    display: none;
  }

  .spinner-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .battles {
    max-width: 4rem;
  }

  .p-divider .p-divider-content {
    background: none;
  }

  .p-tag {
    background: #1472ff;
    color: #ffffff;
  }

  .premium {
    color: #ffa726;
  }

  .p-datatable .p-datatable-loading-icon {
    color: #ffa726;
  }

  // *****
  // Unable to select multiple slotProps classes at once. ('wn8- ' and 'wr- ')
  // It breaks coloring for both.
  // Needed to select separately.
  // *****
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

  .wr-1 {
    background-color: #401070;
    color: #ffffff;
  }

  .wr-2 {
    background-color: #793db6;
    color: #ffffff;
  }

  .wr-3 {
    background-color: #3972c6;
    color: #ffffff;
  }

  .wr-4 {
    background-color: #4099bf;
    color: #ffffff;
  }

  .wr-5 {
    background-color: #4d7326;
    color: #ffffff;
  }

  .wr-6 {
    background-color: #849b24;
    color: #ffffff;
  }

  .wr-7 {
    background-color: #ccb800;
    color: #ffffff;
  }

  .wr-8 {
    background-color: #cc7a00;
    color: #ffffff;
  }

  .wr-9 {
    background-color: #cd3333;
    color: #ffffff;
  }

  .wr-10 {
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

  .graphic:first-child {
    margin-right: 4rem;
    margin-left: 2rem;
  }

  .graphic {
    position: relative;
    width: 45%;
    float: left;
    margin: auto;
  }

  .short_name {
    color: #ffa726;
  }
}

@media only screen and (max-width: 1000px) {
  .graphic {
    position: relative;
    width: 90%;
    margin-left: 1rem;
  }
}

@media only screen and (max-width: 600px) {
  .container {
    width: 100%;
    padding-bottom: 5rem;

    .graphic {
      position: relative;
      width: 95%;
      margin: 0.3rem;
    }

    .profile-second {
      display: inline-flex;
    }

    .profile {
      flex-direction: column;
      width: 100%;
    }
  }
}

.profile {
  display: flex;
  width: 100%;
  color: #ffffff;
  padding-top: 1rem;

  .profile-second {
    display: inline-flex;
    margin-right: 0.8rem;
  }

  .container-one {
    .logo {
      height: 128px;
      width: 128px;
      margin-right: 0.8rem;
    }
  }
  .container-two {
    width: 100%;

    .tag {
      color: v-bind('clanData.clan.color');
      font-size: 1.8rem;
    }

    .playername {
      font-size: 2rem;
      font-weight: 700;
    }

    .role {
      font-size: 1.2rem;
      padding-bottom: -2rem;
    }
  }
  // .container-three {
  //   width: 50%;
  // }
}

// .tier,
// .icon,
// .nation {
//     width: 120px;
// }
</style>
