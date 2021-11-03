import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';

import { DailyFeedbackRoutingModule } from './daily-feedback-routing.module';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DailyFeedbackRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class DailyFeedbackModule { }
