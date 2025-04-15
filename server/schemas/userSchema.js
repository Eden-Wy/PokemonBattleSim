import { Schema, model } from 'mongoose';
import { config } from "dotenv";

config();

// No need to add mongoose.schema because we import it in line 1
const userSchema = new Schema(
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
      unique: true,
      match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, // Regex for email validation      
    },
    user_password: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 100,
      // match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/,
      // This regex enforces:
      // - At least one lowercase letter
      // - At least one uppercase letter
      // - At least one number
      // - At least one special character from @$!%*?&
      // - Length between 8 and 16 characters
    },
    user_score: {
      type: Number, //Declare Number for Integer
      min: 0,
      max: 99999,
    }
  },
  //EDEN: for DB requests:
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (doc, ret) => {
        delete ret.user_password; //Prevents password from being fetched with user info
        return ret;
      },
    },
    toObject: {
      virtuals: true,
      versionKey: false,
      transform: (doc, ret) => {
        delete ret.user_password;
        return ret;
      },
    },
  }
);
//  {
//    tableName: "user",
//    timestamps: false,
//    underscored: true,
//  }

// No need to declare a new variable for User because we imported model in line 2
// const User = mongoose.model("User", userSchema);
export default model("User" , userSchema);