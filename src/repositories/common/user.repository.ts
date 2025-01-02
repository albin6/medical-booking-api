import mongoose from "mongoose";
import { IUserRepository } from "./iuser.repository";

export class UserRepository<T> implements IUserRepository<T> {
  private model: mongoose.Model<T>;
  constructor(model: mongoose.Model<T>) {
    this.model = model;
  }
  async createUser(user: T): Promise<T> {
    return await this.model.create(user);
  }
  async findById(id: string): Promise<T | null> {
    return this.model.findById(id);
  }
  async findByEmail(email: string): Promise<T | null> {
    return await this.model.findOne({ email });
  }
}
