export class UserInfo {
  id?: number;
  firstName: string;
  lastName: string;
  gender: string;
  birthday: string;

  constructor() {
    this.firstName = '';
    this.lastName = '';
    this.gender = '';
    this.birthday = '';
  }
}
