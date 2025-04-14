import mongoose from 'mongoose';

const battleSchema = new mongoose.Schema({
  username: String,
  userPokemon: String,
  enemyPokemon: String,
  result: String,
  timestamp: Date,
});

const Battle = mongoose.model('Battle', battleSchema);

export default Battle;