const mongoose = require('mongoose');

mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connected to database');
    })
    .catch((err) => {
        console.log('Unable to connect to database! Error message below!', '\n', err);
    });

module.exports = {
    PlayerGraph: require('./models/playerGraph.model'),
};
