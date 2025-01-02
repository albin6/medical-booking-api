import { Mongo } from "./config/mongo";
import { Server } from "./server";
import dotenv from "dotenv";

dotenv.config();

const app = new Server();
const database = new Mongo();

database.connect();

const PORT = process.env.PORT;
app
  .getApp()
  .listen(PORT, () =>
    console.log(`Server is running on http://127.0.0.1:${PORT}`)
  );
