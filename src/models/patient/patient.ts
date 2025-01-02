import { User } from "../common/user";

export class Patient extends User {
  medicalHistory: string[];
  constructor(
    name: string,
    email: string,
    password: string,
    medicalHistory: string[] = []
  ) {
    super(name, email, password, "patient");
    this.medicalHistory = medicalHistory;
  }
}
