const db = require('../db');
const PlayerGraph = db.PlayerGraph;

module.exports = async function (req, res) {
    try {
        const data = await PlayerGraph.find({ playerId: req.params.id }).limit(5);
        res.status(200).json({ data });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};
