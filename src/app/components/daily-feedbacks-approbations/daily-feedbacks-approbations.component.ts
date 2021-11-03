import { Component, OnInit } from '@angular/core';
import {DailyFeedbackService} from "../../services/daily-feedback.service";

@Component({
  selector: 'app-daily-feedbacks-approbations',
  templateUrl: './daily-feedbacks-approbations.component.html',
  styleUrls: ['./daily-feedbacks-approbations.component.css']
})
export class DailyFeedbacksApprobationsComponent implements OnInit {

  constructor(public dailyFeedbackService: DailyFeedbackService) { }

  ngOnInit(): void {
  }

}
