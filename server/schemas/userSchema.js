import mongoose from 'mongoose';
import { config } from "dotenv";

config();

const userSchema = new mongoose.Schema(
  {
    user_name: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 20,
    },
    user_email: {
      type: String,
      required: true,
    },
    user_password: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 100,
    },
    user_score: {
      type: String,
      minlength: 1,
      maxlength: 99999,
    }
  },
//  {
//    tableName: "user",
//    timestamps: false,
//    underscored: true,
//  }
);

const User = mongoose.model("User", userSchema);

export default User;