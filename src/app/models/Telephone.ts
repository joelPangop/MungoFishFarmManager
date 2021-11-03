export class Telephone {
  id?: number;
  telephone_number: string;
  telephone_category: string;
  userInfosID?: number;

  constructor() {
    this.telephone_number = '';
    this.telephone_category = '';
  }
}
