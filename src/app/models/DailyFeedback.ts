export class DailyFeedback {
  id?: number;
  qtyAlmt09AM: number;
  qtyAlmt12PM: number;
  qtyAlmt03PM: number;
  quantity: number;
  cumulAlmt: number;
  nbMale: number;
  nbFemale: number;
  temp06AM: number;
  temp03PM: number;
  oxyg03PM: number;
  oxyg06AM: number;
  nh3: number;
  nh2: number;
  ph: number;
  remark: string;
  date: Date;
  tankID!: number;
  productID!: number;
  submitted?: boolean;

  constructor() {
    this.qtyAlmt09AM = 0;
    this.qtyAlmt12PM = 0;
    this.qtyAlmt03PM = 0;
    this.quantity = 0;
    this.cumulAlmt = 0;
    this.nbMale = 0;
    this.nbFemale = 0;
    this.temp06AM = 0;
    this.temp03PM = 0;
    this.oxyg03PM = 0;
    this.oxyg06AM = 0;
    this.nh3 = 0;
    this.nh2 = 0;
    this.ph = 0;
    this.remark = "";
    this.date = new Date();
    this.submitted = false;
  }
}
