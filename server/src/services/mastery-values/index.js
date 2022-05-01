const axios = require('axios');
const mergeData = require('../../helpers/mergeData');

const getMasteryValues = async (req, res) => {
  try {
    const masteryRequest = `https://mastery.poliroid.ru/api/eu/vehicles`;
    const masteryResponse = await axios.get(masteryRequest);
    const mastery = masteryResponse.data.data;

    const tanksRequest = `https://api.worldoftanks.eu/wot/encyclopedia/vehicles/?application_id=${process.env.API_KEY}&fields=-radios%2C-tag%2C-suspensions%2C-provisions%2C-engines%2C-crew%2C-guns%2C-multination%2C-description%2C-is_premium_igr%2C-next_tanks%2C-modules_tree%2C-prices_xp%2C-price_gold%2C-price_credit%2C-default_profile%2C-turrets%2C-name%2C-images.small_icon%2C-images.big_icon`;
    const tanksResponse = await axios.get(tanksRequest);
    const tanks = tanksResponse.data.data;

    const mergedTanksData = await mergeData(tanks, mastery);

    res.status(200).json(mergedTanksData);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getMasteryValues,
};
