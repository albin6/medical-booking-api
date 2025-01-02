import mongoose from "mongoose";

export class Mongo {
  private mongoUrl: string;
  constructor() {
    if (!process.env.MONGO_CONNECTION_STRING) {
      throw new Error("No connect string provided");
    }
    this.mongoUrl = process.env.MONGO_CONNECTION_STRING;
  }
  public connect() {
    mongoose
      .connect(this.mongoUrl)
      .then(() => console.log("database connected"))
      .catch((error) => console.error(error));
  }
}
