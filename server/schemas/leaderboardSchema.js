import mongoose from 'mongoose';
import { config } from "dotenv";

config();

const leaderboardSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, 'Enter your name']
  },
  pokemonName: {
    type: String,
    required: [true, 'Enter the name of your Pokemon']
  },
  score: {
    type: String,
    required: [true, 'Update your Score']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Leaderboard = mongoose.model("Leaderboard", leaderboardSchema);

export default Leaderboard;