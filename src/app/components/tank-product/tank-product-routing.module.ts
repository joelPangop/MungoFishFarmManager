import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TankProductComponent} from "./tank-product.component";

const routes: Routes = [{path: '', component: TankProductComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TankProductRoutingModule { }
