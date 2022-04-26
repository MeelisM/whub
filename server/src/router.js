const express = require('express');
const router = express.Router();
const { getExpectedValues, getPlayerStats } = require('./services');

router.get('/test', (req, res) => res.send('Test route'));
router.get('/expected', getExpectedValues);
router.get('/player/:id', getPlayerStats);

module.exports = router;
