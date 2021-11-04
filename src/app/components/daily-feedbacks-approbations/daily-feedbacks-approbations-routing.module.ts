import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DailyFeedbacksApprobationsComponent} from "./daily-feedbacks-approbations.component";

const routes: Routes = [{path: '', component: DailyFeedbacksApprobationsComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DailyFeedbacksApprobationsRoutingModule { }
