const db = require('../db');
const PlayerGraph = db.PlayerGraph;

module.exports = async function (req, res) {
  try {
    const user = await PlayerGraph.exists({ playerId: req.body.playerId });
    if (!user) {
      await PlayerGraph.create({
        playerId: req.body.playerId,
        battles: req.body.battles,
        winrate: req.body.winrate,
        wn8: req.body.wn8,
      });
      res.status(200).json({ message: 'Added!' });
    } else {
      await PlayerGraph.updateMany(
        { playerId: req.body.playerId },
        {
          $push: { battles: req.body.battles, winrate: req.body.winrate, wn8: req.body.wn8, $slice: -10 },
        }
      );
      res.status(200).json({ message: 'Updated!' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Oops! Something went wrong!' });
  }
};
