export class Approbation {
  id?: number;
  daily_feedbackID?: number;
  userID?: number;
  supervisorID?: number;
  status?: string;
  createdAt?: Date;
  approvedAt?: Date;
  rejectedAt?: Date;

  constructor() {
    this.status = '';
  }
}
