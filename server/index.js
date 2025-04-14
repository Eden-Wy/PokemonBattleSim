import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import connectDB from './db/connect.js';
import battleRoutes from './routes/battleRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

connectDB();

app.use('/api', battleRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
