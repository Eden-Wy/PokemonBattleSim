import { Schema, model } from 'mongoose';
import { config } from "dotenv";


config();

const userHistorySchema = new Schema({
  userName: {
    type: String,
    required: true
  },
  chosenPokemon: {
    type: String,
    required: [true, 'Enter the name of your favoritePokemon']
  },
  enemyPokemon: {
    type: String,
    required: [true, 'Enter the name of your favoritePokemon']
  },
  outcome: {
    type: String,
    required: [true, 'Update your Score']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default model("userHistory", userHistorySchema);