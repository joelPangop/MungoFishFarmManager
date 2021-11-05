import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {DailyFeedbackService} from "../../services/daily-feedback.service";
import {UserService} from "../../services/user.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Approbation} from "../../models/Approbation";
import * as moment from 'moment';
import {ApprobationStatus} from "../../models/ApprobationStatus";
import {Router} from "@angular/router";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {DialogComponent} from "../dialog/dialog.component";
import {BehaviorSubject} from "rxjs";
import {ModalDialogService, SimpleModalComponent} from "ngx-modal-dialog";

@Component({
  selector: 'app-daily-feedbacks-approbations',
  templateUrl: './daily-feedbacks-approbations.component.html',
  styleUrls: ['./daily-feedbacks-approbations.component.css']
})
export class DailyFeedbacksApprobationsComponent implements OnInit {

  listForm: FormGroup;
  options: any;
  loadingObserver!: BehaviorSubject<boolean>;
  resultObserver!: BehaviorSubject<string>;
  dialogRef: MatDialogConfig<MatDialog> | undefined;
  view: string = "";
  views = ["user", "supervisor"];
  status: string = "";

  constructor(public dailyFeedbackService: DailyFeedbackService, public userService: UserService, private formBuilder: FormBuilder,
              public router: Router, public dialog: MatDialog) {
    this.dailyFeedbackService.dailyFeedbacks = [];
    this.dailyFeedbackService.approbations = [];
    this.listForm = this.formBuilder.group({
      approbations: ['']
    })
  }

  ngOnInit(): void {
    this.loadUsers();
    if (this.userService.isSuperAdmin() || this.userService.isAdmin()) {
      this.view = "supervisor";
      this.loadApprobationsBySupervisor();
    } else {
      this.view = "user"
      this.loadApprobationsByUser();
    }

    this.options = Object.values(ApprobationStatus);
    this.loadFeedbacks();
  }

  openDialog(status: string, message: string, mode: string, type?: string, nb?: number): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {loading: this.loadingObserver, status: status, message: message, mode, nb, type}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  loadApprobations() {
    this.dailyFeedbackService.getAllApprobations(this.userService.currentUserValue.id).subscribe((res) => {
      this.dailyFeedbackService.approbations = res;
    })
  }

  loadApprobationsByUser() {
    this.dailyFeedbackService.getApprobationByUserID(this.userService.currentUserValue.id as number).subscribe((res) => {
      this.dailyFeedbackService.approbations = res;
    })
  }

  loadApprobationsBySupervisor() {
    this.dailyFeedbackService.getApprobationBySupervisorID(this.userService.currentUserValue.id as number).subscribe((res) => {
      this.dailyFeedbackService.approbations = res;
      let tablinks, i;
      tablinks = document.getElementsByClassName('page');
      if (tablinks.length > 0)
        tablinks[tablinks.length - 1].className += ' active';
    })
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe((res) => {
      this.userService.users = res;
    })
  }

  loadFeedbacks() {
    this.dailyFeedbackService.getAll().subscribe((res) => {
      this.dailyFeedbackService.dailyFeedbacks = res;
    })
  }

  getUserName(item: Approbation) {
    let name = "";

    for (let user of this.userService.users) {
      if (user.id === item.userID) {
        name = user.userName
      }
    }
    return name;
  }

  getDfName(item: Approbation) {
    // let name = "";
    //
    // for (let dailyFeedback of this.dailyFeedbackService.dailyFeedbacks) {
    //   if (dailyFeedback.id === item.daily_feedbackID) {
    //     name = this.getUserName(item) + "_" + this.getDate(item.createdAt);
    //   }
    // }
    return this.getUserName(item) + "_" + this.getDate(item.createdAt);
  }

  getDate(date: any) {
    return moment(date).format('MMMM_DD_YYYY');
  }

  getLoadFeedBack(item: Approbation){
    let status: boolean | undefined = false;
    for (let dailyFeedback of this.dailyFeedbackService.dailyFeedbacks) {
      if (dailyFeedback.id === item.daily_feedbackID) {
        status = dailyFeedback.submitted;
      }
    }
    return status;
  }

  async submit(approbation: Approbation) {
    this.loadingObserver = new BehaviorSubject<boolean>(false);
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      disableClose: false,
      data: {loading: this.loadingObserver, status: status, message: "", type: "confirm"}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        // do confirmation actions
        this.sendResponse(approbation);
      }
    });

  }

  async sendResponse(approbation: Approbation) {
    this.loadingObserver = new BehaviorSubject<boolean>(true);
    await this.openDialog("", "", "indeterminate");
    this.dailyFeedbackService.updateApprobation(approbation.id, {
      approbation: approbation,
      supervisor: this.userService.currentUserValue
    }).subscribe(async (res) => {
      this.dialog.closeAll();
      this.loadingObserver = new BehaviorSubject<boolean>(false);
      await this.openDialog(res.status, res.message, "indeterminate", "result");
      console.log(res)
    });
  }

  goToDf(daily_feedbackID: any) {
    this.dailyFeedbackService.getByID(daily_feedbackID).subscribe((res) => {
      this.router.navigate(['daily_feedback'], {
        queryParams: {
          feedback: JSON.stringify(res),
          skipLocationChange: true,
          replaceUrl: true
        }
      });
    })
  }

  changeView(event: Event, view: string) {
    if (view === "user") {
      this.loadApprobationsByUser();
    } else {
      this.loadApprobationsBySupervisor();
    }
    let tablinks, i;

    tablinks = document.getElementsByClassName('page');
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(' active', '');
      console.log(tablinks[i].className);
    }
    // @ts-ignore
    event.currentTarget.className += ' active';
  }
}
