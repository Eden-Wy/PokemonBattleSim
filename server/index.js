import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { errorHandler } from "./utils/errorHandler.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";

config();

const app = express();
const PORT = process.env.PORT;

app.use(cors({origin: "*"}));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);
app.use("/orders", orderRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`✅ Server is 🏃‍♂️ on port ${PORT}`);
});