export interface IUserRepository<T> {
  createUser(user: T): Promise<T>;
  findById(id: string): Promise<T | null>;
  findByEmail(email: string): Promise<T | null>;
}
