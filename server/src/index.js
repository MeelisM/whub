require('dotenv').config();

var cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = require('./router');

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', router);

app.get('/', (req, res) => {
  res.send('Working!');
});

const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
