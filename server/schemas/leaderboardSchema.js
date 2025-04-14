import { Schema, model } from 'mongoose';
import { config } from "dotenv";


config();

const leaderboardSchema = new Schema(
    {
  userName: {
    type: Schema.Types.user_name, 
    ref: 'User', 
    required: true
    },
  score: {
    type: Schema.Types.user_score,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
},
  {
    timestamps: true,
  }
);

export default model( "Leaderboard", leaderboardSchema);