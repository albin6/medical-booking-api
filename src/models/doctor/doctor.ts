import { User } from "../common/user";

export class Doctor extends User {
  speciality: string;
  constructor(
    name: string,
    email: string,
    password: string,
    speciality: string
  ) {
    super(name, email, password, "doctor");
    this.speciality = speciality;
  }
}
