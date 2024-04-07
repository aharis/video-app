import express from "express";
import dotenv from 'dotenv';
import connectDB from "./config/db.js";
import router from "./routes/routes.js";
import { errorMiddleware } from "./middlewares/errorMidlleware.js";

const app = express();
app.use(express.json());
dotenv.config();
app.use("/api", router);
app.use(errorMiddleware);

app.listen(3000, () => {
  connectDB();
  console.log(`Server is running on port 3000`);
});
