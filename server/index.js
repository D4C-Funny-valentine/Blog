import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import connectDB from "./config/database.connect.js";
import routes from "./routes/index.js";

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

connectDB();

app.use(cors());

const port = process.env.PORT || 3000;

app.use("/api", routes);

mongoose.connection.once("open", () => {
  console.log("connected Database");
  app.listen(port, () => {
    console.log("Server running on port " + port);
  });
});
