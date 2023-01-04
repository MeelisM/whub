const db = require("../db");
const PlayerGraph = db.PlayerGraph;

module.exports = async function (req, res) {
  try {
    await PlayerGraph.updateMany(
      { playerId: req.body.playerId },
      {
        $push: {
          winrate: req.body.winrate,
          battles: req.body.battles,
          wn8: req.body.wn8,
        },
      },
      { upsert: true }
    );
    res.status(200).json({ message: "Success!" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};
