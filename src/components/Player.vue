<template>
  <div class="container">
    <div class="main-container">
      <div v-if="!loading" class="profile-container">
        <div class="info-box one">
          <div class="table-user">
            <table>
              <tr>
                <td class="player-name">{{ this.responseData.playerInfo.username }}</td>
              </tr>
              <tr>
                <td>CREATED: {{ timestampToDate(this.responseData.playerInfo.createdAt) }}</td>
              </tr>
              <tr>
                <td>LAST BATTLE: {{ timestampToDate(this.responseData.playerInfo.lastBattle) }}</td>
              </tr>
            </table>
          </div>
        </div>

        <Divider class="divider-profile">
          <span class="p-tag">General Statistics</span>
        </Divider>
        <div class="info-box two">
          <table>
            <tr>
              <td>WN8</td>
              <td>{{ this.responseData.playerInfo.wn8 }}</td>
              <td>+2</td>
            </tr>
            <tr>
              <td>RATING</td>
              <td>{{ this.responseData.playerInfo.globalRating }}</td>
              <td>+3</td>
            </tr>
            <tr>
              <td>BATTLES</td>
              <td>{{ this.responseData.playerInfo.battles }}</td>
              <td>+46</td>
            </tr>
            <tr>
              <td>MAX XP</td>
              <td>{{ formatNumbers(this.responseData.playerInfo.xpMax) }}</td>
              <td>-</td>
            </tr>
            <tr>
              <td>SURVIVED</td>
              <td>{{ this.responseData.playerInfo.survivalRate }}%</td>
              <td>+0.07%</td>
            </tr>
            <tr>
              <td>HITRATE</td>
              <td>{{ this.responseData.playerInfo.hitsPercent }}%</td>
              <td>-</td>
            </tr>
            <tr>
              <td>BLOCKED</td>
              <td>{{ this.responseData.playerInfo.blockedAverage }}</td>
              <td>+0.02</td>
            </tr>
            <tr>
              <td>TREES CUT</td>
              <td>{{ this.responseData.playerInfo.treesCut }}</td>
              <td>+192</td>
            </tr>
          </table>
          <table>
            <tr>
              <td>WINS</td>
              <td>{{ this.responseData.playerInfo.winRate }}%</td>
              <td>{{ formatNumbers(this.responseData.playerInfo.wins) }}</td>
            </tr>
            <tr>
              <td>LOSSES</td>
              <td>{{ this.responseData.playerInfo.lossRate }}%</td>
              <td>{{ formatNumbers(this.responseData.playerInfo.losses) }}</td>
            </tr>
            <tr>
              <td>DRAWS</td>
              <td>{{ this.responseData.playerInfo.drawRate }}%</td>
              <td>{{ formatNumbers(this.responseData.playerInfo.draws) }}</td>
            </tr>
            <tr>
              <td>DAMAGE</td>
              <td>{{ formatNumbers(this.responseData.playerInfo.damageAvg) }}</td>
              <td>{{ formatNumbers(this.responseData.playerInfo.damageDealt) }}</td>
            </tr>
            <tr>
              <td>KILLS</td>
              <td>{{ this.responseData.playerInfo.killsAvg }}</td>
              <td>{{ formatNumbers(this.responseData.playerInfo.kills) }}</td>
            </tr>
            <tr>
              <td>SPOTS</td>
              <td>{{ this.responseData.playerInfo.spotsAvg }}</td>
              <td>{{ formatNumbers(this.responseData.playerInfo.spotsTotal) }}</td>
            </tr>
            <tr>
              <td>CAP</td>
              <td>{{ this.responseData.playerInfo.captureAvg }}</td>
              <td>{{ formatNumbers(this.responseData.playerInfo.capturePoints) }}</td>
            </tr>
            <tr>
              <td>DECAP</td>
              <td>{{ this.responseData.playerInfo.defenseAvg }}</td>
              <td>{{ formatNumbers(this.responseData.playerInfo.defensePoints) }}</td>
            </tr>
          </table>
        </div>
        <Divider class="divider-clan">
          <span class="p-tag">Clan Information</span>
        </Divider>
        <div v-if="!displayClanInfo" class="info-box three">
          <img :src="this.clanData.clan.emblems.x195.portal" alt="Clan logo" /> <br />
          <div class="clan-tag">[{{ this.clanData.clan.tag }}] Private</div>
          <div>Joined @ {{ timestampToDate(this.clanData.joined_at) }}</div>
        </div>
      </div>

      <Divider>
        <span class="p-tag">Graphs</span>
      </Divider>

      <div class="chart-container">
        <div class="chart-one">
          <Chart type="line" :data="multiAxisChart" :options="multiAxisOptions" />
        </div>
        <div class="chart-two">
          <Chart type="bar" :data="barChartData" :options="barChartOptions" />
        </div>
      </div>
      <Divider>
        <span class="p-tag tanks">Tanks Data</span>
      </Divider>

      <div v-if="loading" class="spinner-container-player">
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
        <Column field="tier" header="Tier" :sortable="true" class="field tier"></Column>
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
            label: 'VEHICLES PER TIER',
            backgroundColor: '#1472ff',
            data: [],
          },
        ],
      },
      barChartOptions: {
        responsive: true,
        layout: {
          padding: {
            left: 30,
          },
        },
        plugins: {
          legend: {
            display: true,
            labels: {
              font: {
                family: 'Segoe UI, sans-serif',
              },
              color: '#dedede',
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: '#dedede',
            },
            grid: {
              color: '#495057',
            },
          },
          y: {
            ticks: {
              color: '#dedede',
            },
            grid: {
              color: '#495057',
            },
          },
        },
      },
      multiAxisChart: {
        labels: [],
        datasets: [
          {
            label: 'WN8',
            fill: false,
            borderColor: '#1472ff',
            yAxisID: 'y',
            tension: 0.4,
            data: [],
          },
          {
            label: 'WR%',
            fill: false,
            borderColor: '#00bb7e',
            yAxisID: 'y1',
            tension: 0.4,
            data: [],
          },
        ],
      },
      multiAxisOptions: {
        layout: {
          padding: {
            left: 30,
          },
        },
        responsive: true,
        stacked: false,
        plugins: {
          legend: {
            labels: {
              font: {
                family: 'Segoe UI, sans-serif',
              },
              color: '#dedede',
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: '#dedede',
            },
            grid: {
              color: '#495057',
            },
          },
          y: {
            type: 'linear',
            display: true,
            position: 'left',
            ticks: {
              color: '#1472ff',
            },
            grid: {
              color: '#495057',
            },
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            ticks: {
              color: '#00bb7e',
            },
            grid: {
              drawOnChartArea: false,
              color: '#495057',
            },
          },
        },
      },
      loading: false,
      displayClanInfo: false,
      clanData: {
        clan: {
          name: '',
          color: '',
          created_at: 0,
          tag: 'No Clan',
          emblems: {
            x195: {
              portal: 'No clan',
            },
          },
        },
        role_i18n: '',
        joined_at: 0,
      },

      responseData: {
        tankStats: [],
        playerInfo: {
          username: 'Loading',
          accountId: 0,
          clanId: 0,
          globalRating: 0,
          spotsTotal: 0,
          spotsAvg: 0,
          assistedAverage: 0,
          hitsTotal: 0,
          hitsPercent: 0,
          xpMax: 0,
          xpTotal: 0,
          blockedAverage: 0,
          capturePoints: 0,
          defensePoints: 0,
          defenseAvg: 0,
          survivedBattles: 0,
          kills: 0,
          killsMax: 0,
          killsAvg: 0,
          damageDealt: 0,
          damageReceived: 0,
          damageMax: 0,
          damageAvg: 0,
          wins: 0,
          losses: 0,
          draws: 0,
          battles: 0,
          winRate: 0,
          survivalRate: 0,
          wn8: 0,
          lossRate: 0,
          lastBattle: null,
          createdAt: null,
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
    });

    this.dataService.getPlayerClan(id).then((data) => {
      if (data.data[id] != null) {
        this.clanData = data.data[id];
      } else {
        this.displayClanInfo = true;
      }
    });
    this.dataService.getGraphValues(id).then((data) => {
      this.multiAxisChart.labels = data.data[0].battles;
      this.multiAxisChart.datasets[0].data = data.data[0].wn8;
      this.multiAxisChart.datasets[1].data = data.data[0].winrate;
    });
  },
  methods: {
    formatNumbers(number) {
      const formattedNumber = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return formattedNumber;
    },

    timestampToDate(timestamp) {
      const date = new Date(timestamp * 1000).toLocaleDateString('en-GB');
      return date;
    },

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

<style lang="scss" scoped>
.profile-container {
  display: flex;
  justify-content: space-between;

  tr:first-child {
    td {
      width: 70%;
    }
  }

  .player-name {
    font-size: 2rem;
    font-weight: bold;
    color: var(--text-dark);
  }

  .info-box {
    width: 33.33%;
    color: var(--text-light);

    &.two {
      table {
        margin: auto;
        width: 100%;
        text-align: center;

        td {
          width: 33.33%;
          padding: 0rem 1rem 0rem 1rem;
          &:first-child {
            font-weight: 700;
            text-align: right;
            border-right: solid 3px var(--text-dark);
          }
          &:nth-child(n + 2) {
            font-weight: 600;
          }
        }
      }
    }
    &.three {
      text-align: right;
      .clan-tag {
        font-size: 1.4rem;
        color: v-bind('clanData.clan.color');
      }

      img {
        height: 128px;
        width: 128px;
      }
    }
  }
}
.loading-msg {
  color: var(--text-light);
}

.img-mastery-none {
  display: none;
}

.spinner-container-player {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.battles {
  max-width: 4rem;
}

// *****
// Unable to select multiple slotProps classes at once. ('wn8- ' and 'wr- ')
// It breaks coloring for both.
// Needed to select separately.
// *****
.wn8-1 {
  background-color: #401070;
  color: var(--text-light);
}

.wn8-2 {
  background-color: #793db6;
  color: var(--text-light);
}

.wn8-3 {
  background-color: #3972c6;
  color: var(--text-light);
}

.wn8-4 {
  background-color: #4099bf;
  color: var(--text-light);
}

.wn8-5 {
  background-color: #4d7326;
  color: var(--text-light);
}

.wn8-6 {
  background-color: #849b24;
  color: var(--text-light);
}

.wn8-7 {
  background-color: #ccb800;
  color: var(--text-light);
}

.wn8-8 {
  background-color: #cc7a00;
  color: var(--text-light);
}

.wn8-9 {
  background-color: #cd3333;
  color: var(--text-light);
}

.wn8-10 {
  background-color: #930d0d;
  color: var(--text-light);
}

.wr-1 {
  background-color: #401070;
  color: var(--text-light);
}

.wr-2 {
  background-color: #793db6;
  color: var(--text-light);
}

.wr-3 {
  background-color: #3972c6;
  color: var(--text-light);
}

.wr-4 {
  background-color: #4099bf;
  color: var(--text-light);
}

.wr-5 {
  background-color: #4d7326;
  color: var(--text-light);
}

.wr-6 {
  background-color: #849b24;
  color: var(--text-light);
}

.wr-7 {
  background-color: #ccb800;
  color: var(--text-light);
}

.wr-8 {
  background-color: #cc7a00;
  color: var(--text-light);
}

.wr-9 {
  background-color: #cd3333;
  color: var(--text-light);
}

.wr-10 {
  background-color: #930d0d;
  color: var(--text-light);
}

@media only screen and (max-width: 900px) {
  .profile-container {
    flex-direction: column;
    display: inline-flex;
    width: 100%;
    margin-top: 1rem;

    .info-box {
      height: 10vh;

      .divider-clan {
        display: none;
      }
      .divider-profile {
        display: none;
      }

      &.one {
        width: 100%;
        display: flex;
        justify-content: center;
        text-align: center;
      }
      &.two {
        padding-top: 2rem;
        width: 100%;
        height: 100%;
        td {
          padding: 0rem 1rem 0rem 1rem;
          &:first-child {
            font-weight: 700;
            text-align: right;
            border-right: solid 1px var(--text-dark);
            color: #495057;
          }
          &:nth-child(n + 2) {
            font-weight: 600;
          }
        }
      }
      &.three {
        width: 100%;
        height: auto;
        text-align: center;
        margin-top: 2rem;
      }
    }
  }

  .chart-container {
    display: flex;
    flex-direction: column;
    .chart-one {
      position: relative;
      width: 90%;
    }

    .chart-two {
      position: relative;
      width: 90%;
    }
  }
}

@media only screen and (min-width: 900px) {
  .info-box {
    padding-top: 1rem;
    .divider {
      &.profile {
        display: none;
        color: red;
      }
    }

    &.one {
      width: 18%;
      .table-user {
        display: flex;
      }
    }

    &.two {
      width: 70%;
      display: flex;
    }

    &.three {
      width: 12%;
    }
  }

  .divider-clan {
    display: none;
  }
  .divider-profile {
    display: none;
  }
  .chart-container {
    display: flex;
    .chart-one {
      position: relative;
      width: 49%;
    }

    .chart-two {
      position: relative;
      width: 49%;
    }
  }
}
</style>
