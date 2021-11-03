import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteRoutingModule } from './site-routing.module';
import {MatGridListModule} from "@angular/material/grid-list";
import {MatTableModule} from "@angular/material/table";
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from "@angular/material/form-field";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SiteRoutingModule,
    MatFormFieldModule,
    MatGridListModule,
    MatTableModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SiteModule { }
