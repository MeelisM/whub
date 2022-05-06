const axios = require('axios');
const calculateWn8 = require('../../helpers/wn8');
const mergeData = require('../../helpers/mergeData');

const getPlayerStats = async function (req, res) {
  try {
    const playerId = req.params.id;

    const playerGeneralStatsRequest = `https://api.worldoftanks.eu/wot/account/info/?application_id=${process.env.API_KEY}&account_id=${playerId}&fields=-statistics.clan%2C-statistics.regular_team%2C-statistics.company%2C-statistics.stronghold_skirmish%2C-statistics.stronghold_defense%2C-statistics.historical%2C-statistics.team%2C-statistics.all.battles_on_stunning_vehicles%2C-statistics.all.tanking_factor%2C-statistics.all.stun_number%2C-statistics.all.stun_assisted_damage%2C-statistics.all.max_frags_tank_id%2C-statistics.all.max_xp_tank_id%2C-statistics.all.explosion_hits%2C-statistics.all.piercings%2C-statistics.all.direct_hits_received%2C-statistics.all.max_damage_tank_id%2C-statistics.all.piercings_received%2C-statistics.all.no_damage_direct_hits_received%2C-statistics.all.shots%2C-statistics.all.explosion_hits_received%2C-client_language%2C-private%2C-updated_at%2C-created_at%2C-statistics.frags%2C-logout_at%2C-statistics.trees_cut%2C-last_battle_time%2C-statistics.all.avg_damage_assisted_radio%2C-statistics.all.avg_damage_assisted_track`;
    const playerTankStatsRequest = `https://api.worldoftanks.eu/wot/tanks/stats/?application_id=${process.env.API_KEY}&account_id=${playerId}&fields=-clan%2C-stronghold_skirmish%2C-company%2C-stronghold_defense%2C-team%2C-globalmap%2C-regular_team%2C-in_garage%2C-frags%2C-all.battles_on_stunning_vehicles%2C-all.direct_hits_received%2C-all.piercings%2C-all.damage_received%2C-all.stun_number%2C-all.stun_assisted_damage%2C-all.hits%2C-all.no_damage_direct_hits_received%2C-all.shots%2C-all.explosion_hits_received%2C-account_id`;

    const playerGeneralStatsResponse = await axios.get(playerGeneralStatsRequest);
    const playerTankStatsResponse = await axios.get(playerTankStatsRequest);

    const expectedValuesRequest = `${process.env.BACKEND_URL}/api/expected`;
    const expectedValuesResponse = await axios.get(expectedValuesRequest);
    const expectedValues = expectedValuesResponse.data;

    const playerTankStats = playerTankStatsResponse.data.data[playerId];

    const mergedTanksData = await mergeData(playerTankStats, expectedValues);

    const wn8PerTank = [];

    await mergedTanksData.forEach((index) => {
      const wn8data = {
        id: index.tank_id,
        survived: (index.all.survived_battles / index.all.battles) * 100,
        expDef: index.expDef,
        expDmg: index.expDamage,
        expFrag: index.expFrag,
        expSpot: index.expSpot,
        expWinRate: index.expWinRate,
        avgDef: index.all.dropped_capture_points / index.all.battles || 1,
        avgDmg: index.all.damage_dealt / index.all.battles || 1,
        avgSpot: index.all.spotted / index.all.battles || 1,
        avgWinRate: (index.all.wins / index.all.battles) * 100 || 1,
        avgFrag: index.all.frags / index.all.battles || 1,
        wn8: '',
      };

      if ((this.avgDef || this.avgDmg || this.avgSpot || this.avgWinRate || this.avgFrag) === null) {
        avgDef = 0;
        avgDmg = 0;
        avgSpot = 0;
        avgWinRate = 0;
        avgFrag = 0;
      }

      return wn8PerTank.push(wn8data);
    });

    const wn8Results = await wn8PerTank.map(calculateWn8);

    const overallWn8 = await wn8Results.reduce((previous, current, index, array) => {
      let wn8 = previous.wn8 + current.wn8;

      if (index === array.length - 1) {
        wn8 /= array.length;
      }
      return { wn8 };
    });

    const tankStats = await mergeData(mergedTanksData, wn8Results);

    const playerProfile = {
      tankStats,

      playerInfo: {
        username: playerGeneralStatsResponse.data.data[playerId].nickname,
        accountId: playerId,
        clanId: playerGeneralStatsResponse.data.data[playerId].clan_id,
        globalRating: playerGeneralStatsResponse.data.data[playerId].global_rating,
        spotsTotal: playerGeneralStatsResponse.data.data[playerId].statistics.all.spotted,
        spotsAvg:
          playerGeneralStatsResponse.data.data[playerId].statistics.all.spotted /
          playerGeneralStatsResponse.data.data[playerId].statistics.all.battles,
        assistedAverage: playerGeneralStatsResponse.data.data[playerId].statistics.all.avg_damage_assisted,
        hitsTotal: playerGeneralStatsResponse.data.data[playerId].statistics.all.hits,
        hitsPercent: playerGeneralStatsResponse.data.data[playerId].statistics.all.hits_percents,
        xpAverage: playerGeneralStatsResponse.data.data[playerId].statistics.all.avg_xp,
        xpMax: playerGeneralStatsResponse.data.data[playerId].statistics.all.max_xp,
        xpTotal: playerGeneralStatsResponse.data.data[playerId].statistics.all.xp,
        blockedAverage: playerGeneralStatsResponse.data.data[playerId].statistics.all.avg_damage_blocked,
        capturePoints: playerGeneralStatsResponse.data.data[playerId].statistics.all.capture_points,
        captureAvg: (
          playerGeneralStatsResponse.data.data[playerId].statistics.all.capture_points /
          playerGeneralStatsResponse.data.data[playerId].statistics.all.battles
        ).toFixed(2),
        defensePoints: playerGeneralStatsResponse.data.data[playerId].statistics.all.dropped_capture_points,
        defenseAvg: (
          playerGeneralStatsResponse.data.data[playerId].statistics.all.dropped_capture_points /
          playerGeneralStatsResponse.data.data[playerId].statistics.all.battles
        ).toFixed(2),
        survivedBattles: playerGeneralStatsResponse.data.data[playerId].statistics.all.survived_battles,
        kills: playerGeneralStatsResponse.data.data[playerId].statistics.all.frags,
        killsMax: playerGeneralStatsResponse.data.data[playerId].statistics.all.max_frags,
        killsAvg: (
          playerGeneralStatsResponse.data.data[playerId].statistics.all.frags /
          playerGeneralStatsResponse.data.data[playerId].statistics.all.battles
        ).toFixed(2),
        damageDealt: playerGeneralStatsResponse.data.data[playerId].statistics.all.damage_dealt,
        damageReceived: playerGeneralStatsResponse.data.data[playerId].statistics.all.damage_received,
        damageMax: playerGeneralStatsResponse.data.data[playerId].statistics.all.max_damage,
        damageAvg: (
          playerGeneralStatsResponse.data.data[playerId].statistics.all.damage_dealt /
          playerGeneralStatsResponse.data.data[playerId].statistics.all.battles
        ).toFixed(2),
        wins: playerGeneralStatsResponse.data.data[playerId].statistics.all.wins,
        losses: playerGeneralStatsResponse.data.data[playerId].statistics.all.losses,
        draws: playerGeneralStatsResponse.data.data[playerId].statistics.all.draws,
        battles: playerGeneralStatsResponse.data.data[playerId].statistics.all.battles,
        lossRate: (
          (playerGeneralStatsResponse.data.data[playerId].statistics.all.losses /
            playerGeneralStatsResponse.data.data[playerId].statistics.all.battles) *
          100
        ).toFixed(2),
        drawRate: (
          (playerGeneralStatsResponse.data.data[playerId].statistics.all.draws /
            playerGeneralStatsResponse.data.data[playerId].statistics.all.battles) *
          100
        ).toFixed(2),
        winRate: (
          (playerGeneralStatsResponse.data.data[playerId].statistics.all.wins /
            playerGeneralStatsResponse.data.data[playerId].statistics.all.battles) *
          100
        ).toFixed(2),
        survivalRate: (
          (playerGeneralStatsResponse.data.data[playerId].statistics.all.survived_battles /
            playerGeneralStatsResponse.data.data[playerId].statistics.all.battles) *
          100
        ).toFixed(2),
        wn8: (overallWn8.wn8 * 1.1).toFixed(0),
      },
    };
    res.json(playerProfile);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getPlayerStats,
};
