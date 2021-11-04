import {Component, OnInit} from '@angular/core';
import {DailyFeedbackService} from "../../services/daily-feedback.service";
import {UserService} from "../../services/user.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Approbation} from "../../models/Approbation";
import * as moment from 'moment';
import {ApprobationStatus} from "../../models/ApprobationStatus";

@Component({
  selector: 'app-daily-feedbacks-approbations',
  templateUrl: './daily-feedbacks-approbations.component.html',
  styleUrls: ['./daily-feedbacks-approbations.component.css']
})
export class DailyFeedbacksApprobationsComponent implements OnInit {

  listForm: FormGroup;
  options: any;

  constructor(public dailyFeedbackService: DailyFeedbackService, public userService: UserService, private formBuilder: FormBuilder) {
    this.listForm = this.formBuilder.group({
      approbations: ['']
    })
  }

  ngOnInit(): void {
    this.options = Object.values(ApprobationStatus);
    this.loadApprobations();
    this.loadUsers();
    this.loadFeedbacks();
  }

  loadApprobations(){
    this.dailyFeedbackService.getAllApprobations(this.userService.currentUserValue.id).subscribe((res) => {
      this.dailyFeedbackService.approbations = res;
    })
  }

  loadUsers(){
    this.userService.getAllUsers().subscribe((res) => {
      this.userService.users = res;
    })
  }

  loadFeedbacks() {
    this.dailyFeedbackService.getAll().subscribe((res) => {
      this.dailyFeedbackService.dailyFeedbacks = res;
    })
  }

  getUserName(item: Approbation){
    let name = "";

    for (let user of this.userService.users) {
      if (user.id === item.userID) {
        name = user.userName
      }
    }
    return name;
  }

  getDfName(item: Approbation){
    let name = "";

    for (let dailyFeedback of this.dailyFeedbackService.dailyFeedbacks) {
      if (dailyFeedback.id === item.daily_feedbackID) {
        name = this.getUserName(item)+"_"+this.getDate(item.createdAt);
      }
    }
    return name;
  }

  getDate(date: any){
    return moment(date).format('MMMM_DD_YYYY');
  }

}
