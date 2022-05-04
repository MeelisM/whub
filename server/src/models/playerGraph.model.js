const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  playerId: { type: Number, required: true, unique: true },
  battles: { type: Array, required: true },
  winrate: { type: Array, required: true },
  wn8: { type: Array, required: true },
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('playerGraph', schema);
