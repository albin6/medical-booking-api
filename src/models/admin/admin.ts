import { User } from "../common/user";

export class Admin extends User {
  assignedHospital: string;
  constructor(
    name: string,
    email: string,
    password: string,
    assignedHospital: string
  ) {
    super(name, email, password, "admin");
    this.assignedHospital = assignedHospital;
  }
}
