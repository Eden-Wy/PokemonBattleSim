import express from 'express';
import cors from "cors";
import { config } from "dotenv";
import { errorHandler } from "./utils/errorHandler.js";
import userRoutes from "./routes/userRoutes.js"
import leaderboardRoutes from "./routes/leaderboardRoutes.js";
import mongoose from 'mongoose';
// import bodyParser from 'body-parser';
import './database/mongoDB.js'

config();

//console.log('Environment Variables:', process.env); //To print everythign that's happening, I guess - keep commented out as long as everything works, its block of text is scawwy ＞︿＜
console.log('DATABASE_URI:', process.env.DATABASE_URI); 

const app = express();
const PORT = process.env.PORT || 8080; // default port if nothing else is given

app.use(cors({ origin: "*" }));
app.use(express.json());
// app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World! The server is up and running!");
});

app.use("/users", userRoutes);
app.use("/leaderboard", leaderboardRoutes);

// app.get('*', (req, res) => {
//   res.status(404).json({ message: 'page not found!' });
// });

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`✅ Server is 🏃‍♂️ in ${process.env.NODE_ENV} mode on ${PORT}`);
});


//Mongoose begins
// mongoose.connect(process.env.MONGODB_URI).then(() => {
//  console.log('Connected to MongoDB');
//  app.listen(PORT, () => {
//    console.log(`✅ Server is 🏃‍♂️ on port ${PORT}`);
//  });
// }).catch(error => {
//  console.error('MongoDB connection error:', error);
// });
//Mongoose ends