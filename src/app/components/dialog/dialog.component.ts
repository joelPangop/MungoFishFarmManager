import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {BehaviorSubject} from "rxjs";
import {ProgressSpinnerMode} from "@angular/material/progress-spinner/progress-spinner";

export interface DialogData {
  loading: BehaviorSubject<boolean>;
  status: string;
  message: string;
  mode: ProgressSpinnerMode,
  nb: number,
  result: string,
  type: string
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})

export class DialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

  confirm() {
    this.data.result = "confirm";
    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
