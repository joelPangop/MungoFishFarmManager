export class Address {
  id?: number;
  addr_1: string;
  addr_2?: string;
  appart_num?: number;
  town: string;
  country: string;
  region: string;
  postal_code?: string;
  userInfosID?: number;

  constructor() {
    this.addr_1 = '';
    this.town = '';
    this.region = '';
    this.country = '';
  }
}
