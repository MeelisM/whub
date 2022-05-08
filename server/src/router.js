const express = require('express');
const router = express.Router();
const cors = require('cors');
const { getExpectedValues, getPlayerStats, getMasteryValues, getMoeValues } = require('./services');
const { postGraphData, getGraphData } = require('./controllers');

const options = {
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token'],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: '*',
  preflightContinue: false,
};

router.use(cors(options));

router.get('/test', (req, res) => res.send('Test route'));
router.get('/expected', getExpectedValues);
router.get('/player/:id', getPlayerStats);
router.get('/mastery', getMasteryValues);
router.get('/moe', getMoeValues);

router.get('/graph/:id', getGraphData);
router.post('/graph', postGraphData);

module.exports = router;
