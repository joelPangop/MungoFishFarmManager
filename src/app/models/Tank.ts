import {Site} from "./Site";

export class Tank {
  id: number;
  name: string;
  siteID!: number;

  constructor() {
    this.id = 0;
    this.name = "";
  }
}
