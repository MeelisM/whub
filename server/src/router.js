const express = require("express");
const router = express.Router();
const {
  getExpectedValues,
  getPlayerStats,
  getMasteryValues,
  getMoeValues,
} = require("./services");
const { postGraphData, getGraphData } = require("./controllers");

router.get("/expected", getExpectedValues);
router.get("/player/:id", getPlayerStats);
router.get("/mastery", getMasteryValues);
router.get("/moe", getMoeValues);

router.get("/graph/:id", getGraphData);
router.post("/graph", postGraphData);

module.exports = router;
