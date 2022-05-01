const axios = require('axios');
// const calculateWn8 = require('../../helpers/wn8');
const mergeData = require('../../helpers/mergeData');

const getPlayerStats = async function (req, res) {
  try {
    const username = req.params.id;
    const playerIdRequest = `https://api.worldoftanks.eu/wot/account/list/?application_id=${process.env.API_KEY}&limit=1&search=${username}`;

    const playerIdResponse = await axios.get(playerIdRequest);
    const playerId = playerIdResponse.data.data[0].account_id;

    const playerGeneralStatsRequest = `https://api.worldoftanks.eu/wot/account/info/?application_id=${process.env.API_KEY}&account_id=${playerId}&fields=-statistics.clan%2C-statistics.regular_team%2C-statistics.company%2C-statistics.stronghold_skirmish%2C-statistics.stronghold_defense%2C-statistics.historical%2C-statistics.team%2C-statistics.all.battles_on_stunning_vehicles%2C-statistics.all.tanking_factor%2C-statistics.all.stun_number%2C-statistics.all.stun_assisted_damage%2C-statistics.all.max_frags_tank_id%2C-statistics.all.max_xp_tank_id%2C-statistics.all.explosion_hits%2C-statistics.all.piercings%2C-statistics.all.direct_hits_received%2C-statistics.all.max_damage_tank_id%2C-statistics.all.piercings_received%2C-statistics.all.no_damage_direct_hits_received%2C-statistics.all.shots%2C-statistics.all.explosion_hits_received%2C-client_language%2C-private%2C-updated_at%2C-created_at%2C-statistics.frags%2C-logout_at%2C-statistics.trees_cut%2C-last_battle_time%2C-statistics.all.avg_damage_assisted_radio%2C-statistics.all.avg_damage_assisted_track`;
    const playerTankStatsRequest = `https://api.worldoftanks.eu/wot/tanks/stats/?application_id=${process.env.API_KEY}&account_id=${playerId}&fields=-clan%2C-stronghold_skirmish%2C-company%2C-stronghold_defense%2C-team%2C-globalmap%2C-regular_team%2C-in_garage%2C-frags%2C-all.battles_on_stunning_vehicles%2C-all.direct_hits_received%2C-all.piercings%2C-all.damage_received%2C-all.stun_number%2C-all.stun_assisted_damage%2C-all.hits%2C-all.no_damage_direct_hits_received%2C-all.shots%2C-all.explosion_hits_received%2C-account_id`;

    const playerGeneralStatsResponse = await axios.get(playerGeneralStatsRequest);
    const playerTankStatsResponse = await axios.get(playerTankStatsRequest);

    const expectedValuesRequest = 'http://localhost:3001/api/expected';
    const expectedValuesResponse = await axios.get(expectedValuesRequest);
    const expectedValues = expectedValuesResponse.data;

    const playerTankStats = playerTankStatsResponse.data.data[playerId];

    const mergedTanksData = await mergeData(playerTankStats, expectedValues);

    const wn8PerTank = [];

    await mergedTanksData.forEach((index) => {
      const wn8data = {
        id: index.tank_id,
        expDef: index.expDef,
        expDmg: index.expDamage,
        expFrag: index.expFrag,
        expSpot: index.expSpot,
        expWinRate: index.expWinRate,
        avgDef: index.all.dropped_capture_points / index.all.battles,
        avgDmg: index.all.damage_dealt / index.all.battles,
        avgSpot: index.all.spotted / index.all.battles,
        avgWinRate: (index.all.wins / index.all.battles) * 100,
        avgFrag: index.all.frags / index.all.battles,
        wn8: null,
      };

      return wn8PerTank.push(wn8data);
    });

    const calculateWn8 = function (data) {
      const rDAMAGE = data.avgDmg / data.expDmg;
      const rSPOT = data.avgSpot / data.expSpot;
      const rFRAG = data.avgFrag / data.expFrag;
      const rDEF = data.avgDef / data.expDef;
      const rWIN = data.avgWinRate / data.expWinRate;

      const rWINc = Math.max(0, (rWIN - 0.71) / (1 - 0.71));
      const rDAMAGEc = Math.max(0, (rDAMAGE - 0.22) / (1 - 0.22));
      const rFRAGc = Math.max(0, Math.min(rDAMAGEc + 0.2, (rFRAG - 0.12) / (1 - 0.12)));
      const rSPOTc = Math.max(0, Math.min(rDAMAGEc + 0.1, (rSPOT - 0.38) / (1 - 0.38)));
      const rDEFc = Math.max(0, Math.min(rDAMAGEc + 0.1, (rDEF - 0.1) / (1 - 0.1)));

      const wn8 =
        980 * rDAMAGEc +
        210 * rDAMAGEc * rFRAGc +
        155 * rFRAGc * rSPOTc +
        75 * rDEFc * rFRAGc +
        145 * Math.min(1.8, rWINc);

      return { IDNum: data.id, wn8: Math.round(wn8) };
    };

    const wn8Results = await wn8PerTank.map(calculateWn8);

    const playerFinalStats = await mergeData(mergedTanksData, wn8Results);

    const playerProfile = {
      username: playerIdResponse.data.data[0].nickname,
      accountId: playerIdResponse.data.data[0].account_id,
      clanId: playerGeneralStatsResponse.data.data[playerId].clan_id,
      globalRating: playerGeneralStatsResponse.data.data[playerId].global_rating,

      overallStats: {
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
        defensePoints: playerGeneralStatsResponse.data.data[playerId].statistics.all.dropped_capture_points,
        defenseAvg:
          playerGeneralStatsResponse.data.data[playerId].statistics.all.dropped_capture_points /
          playerGeneralStatsResponse.data.data[playerId].statistics.all.battles,
        survivedBattles: playerGeneralStatsResponse.data.data[playerId].statistics.all.survived_battles,
        kills: playerGeneralStatsResponse.data.data[playerId].statistics.all.frags,
        killsMax: playerGeneralStatsResponse.data.data[playerId].statistics.all.max_frags,
        killsAvg:
          playerGeneralStatsResponse.data.data[playerId].statistics.all.frags /
          playerGeneralStatsResponse.data.data[playerId].statistics.all.battles,
        damageDealt: playerGeneralStatsResponse.data.data[playerId].statistics.all.damage_dealt,
        damageReceived: playerGeneralStatsResponse.data.data[playerId].statistics.all.damage_received,
        damageMax: playerGeneralStatsResponse.data.data[playerId].statistics.all.max_damage,
        damageAvg:
          playerGeneralStatsResponse.data.data[playerId].statistics.all.damage_dealt /
          playerGeneralStatsResponse.data.data[playerId].statistics.all.battles,
        wins: playerGeneralStatsResponse.data.data[playerId].statistics.all.wins,
        losses: playerGeneralStatsResponse.data.data[playerId].statistics.all.losses,
        draws: playerGeneralStatsResponse.data.data[playerId].statistics.all.draws,
        battles: playerGeneralStatsResponse.data.data[playerId].statistics.all.battles,
        winRate:
          (playerGeneralStatsResponse.data.data[playerId].statistics.all.wins /
            playerGeneralStatsResponse.data.data[playerId].statistics.all.battles) *
          100,
      },
      tankStats: playerFinalStats,
    };

    res.json(playerProfile);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getPlayerStats,
};
