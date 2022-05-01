const expectedValues = require('./expected-values');
const playerStats = require('./player-stats');
const masteryValues = require('./mastery-values');
const moeValues = require('./moe-values');

module.exports = {
  ...expectedValues,
  ...playerStats,
  ...masteryValues,
  ...moeValues,
};
