import mongoose from 'mongoose';
import { config } from "dotenv";

config();

const leaderboardSchema = new mongoose.Schema({
  userName: {
    type: Schema.Types.user_name,
    ref: 'User',
    required: true
  },
  score: {
    type: Schema.Types.user_score,
    ref: 'User'
  },
  latestMatch: { //gotta look up syntax in mongo, might still be postgre schtuff
    type: Date,
    default: Date.now
  },
});

const Leaderboard = mongoose.model("Leaderboard", leaderboardSchema);

export default Leaderboard;