export class Approbation {
  id?: number;
  daily_feedbackID?: number;
  userID?: number;
  supervisorID?: number;
  status?: string;
  remark?: string;
  createdAt?: Date;
  approvedAt?: Date;
  rejectedAt?: Date;

  constructor() {
    this.status = '';
  }
}
