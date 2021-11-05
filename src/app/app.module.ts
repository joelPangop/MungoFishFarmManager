import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {HomeComponent} from './components/home/home.component';
import {MenuComponent} from './components/menu/menu.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
import {MatIconModule} from "@angular/material/icon";
import {DailyFeedbackComponent} from './components/daily-feedback/daily-feedback.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {ToastrModule} from "ngx-toastr";
import {SiteComponent} from './components/site/site.component';
import {TankProductComponent} from './components/tank-product/tank-product.component';
import {MatGridListModule} from "@angular/material/grid-list";
import {MatTableModule} from "@angular/material/table";
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from "@angular/material/form-field";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatDialogModule} from "@angular/material/dialog";
import {DialogComponent} from './components/dialog/dialog.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {LoginComponent} from './components/auth/login/login.component';
import {RegisterComponent} from './components/auth/register/register.component';
import {PasswordValidatorDirective} from './services/password-validator.directive';
import {ListComponent} from "./components/auth/list/list.component";
import {ToggleButtonComponent} from "./utils/toggle-button.component";
import {DailyFeedbacksApprobationsComponent} from './components/daily-feedbacks-approbations/daily-feedbacks-approbations.component';
import {ModalDialogModule} from "ngx-modal-dialog";
import { ModalComponentComponent } from './components/modal-component/modal-component.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    ListComponent,
    DailyFeedbackComponent,
    SiteComponent,
    TankProductComponent,
    DialogComponent,
    LoginComponent,
    RegisterComponent,
    ToggleButtonComponent,
    PasswordValidatorDirective,
    DailyFeedbacksApprobationsComponent,
    ModalComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatGridListModule,
    MatTableModule,
    MatFormFieldModule,
    FlexLayoutModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    ToastrModule.forRoot(),
    ModalDialogModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),

  ],
  providers: [{provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}}],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AppModule { }
