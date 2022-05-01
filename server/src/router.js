const express = require('express');
const router = express.Router();
const { getExpectedValues, getPlayerStats, getMasteryValues, getMoeValues } = require('./services');

router.get('/test', (req, res) => res.send('Test route'));
router.get('/expected', getExpectedValues);
router.get('/player/:id', getPlayerStats);
router.get('/mastery', getMasteryValues);
router.get('/moe', getMoeValues);

module.exports = router;
