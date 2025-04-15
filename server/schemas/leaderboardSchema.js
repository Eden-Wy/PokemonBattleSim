import { Schema, model } from 'mongoose';
import { config } from "dotenv";


config();

const leaderboardSchema = new Schema(
    {
      userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  // userName: {
  //   type: Schema.Types.user_name, 
  //   ref: 'User', 
  //   required: true
  //   },
  score: {
    type: Number,
  },
  latestMatch: {
    type: Date,
    default: Date.now
  }
},
  {
    timestamps: true,
  }
);

export default model( "Leaderboard", leaderboardSchema);