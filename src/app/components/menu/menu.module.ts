import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import {MatSidenavModule} from "@angular/material/sidenav";
import {RouterModule} from "@angular/router";
import {MatListModule} from "@angular/material/list";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MenuRoutingModule,
    MatSidenavModule,
    RouterModule,
    MatListModule
  ]
})
export class MenuModule { }
