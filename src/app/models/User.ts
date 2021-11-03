export class User {
  id?: number;
  userName: string;
  email: string;
  password?: string;
  userInfoID?: number;
  roleID?: number;
  supervisorID?: number;
  token?: string;

  constructor() {
    this.userName = '';
    this.email = '';
    this.roleID = 3;
  }
}
