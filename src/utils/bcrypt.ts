import bcrypt from "bcrypt";

export class BcryptPass {
  public async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }
  public async comparePasswords(
    currentPassword: string,
    originalPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(currentPassword, originalPassword);
  }
}
