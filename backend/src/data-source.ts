import { DataSource } from "typeorm";
import { Task } from "./entity/Task";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: process.env.DB_PATH || "./database.sqlite",
  synchronize: true,
  entities: [Task],
});
