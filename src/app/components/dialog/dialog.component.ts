import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {BehaviorSubject} from "rxjs";
import {ProgressSpinnerMode} from "@angular/material/progress-spinner";

export interface DialogData {
  loading: BehaviorSubject<boolean>;
  status: string;
  message: string;
  mode: ProgressSpinnerMode,
  nb: number
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

}
