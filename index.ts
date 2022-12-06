import express, { Express } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/user.routes";
import recipeRoutes from "./routes/recipe.routes";

dotenv.config();

const app: Express = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} request at ${req.path}`);
  next();
});

app.use("/api/user", authRoutes);
app.use("/api/recipes", recipeRoutes);

mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        `⚡[server]: DB connected && Server is running at https://localhost:${process.env.PORT}`
      );
    });
  })
  .catch((error) => {
    console.log(error);
    console.log("failed to connect to db");
  });
