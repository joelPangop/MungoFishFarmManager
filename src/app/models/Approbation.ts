export class Approbation {
  id?: number;
  daily_feedbackID?: number;
  userID?: number;
  supervisorID?: number;
  approved?: boolean;
  createdAt?: Date;
  rejected?: boolean;
  approvedAt?: Date;
  rejectedAt?: Date;

  constructor() {

  }
}
