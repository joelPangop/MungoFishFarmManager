import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DailyFeedbackComponent} from "./components/daily-feedback/daily-feedback.component";
import {HomeComponent} from "./components/home/home.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./components/auth/login/login.module').then(
        m => m.LoginModule
      )
  },
  {
    path: 'daily_feedback',
    loadChildren: () =>
      import('./components/daily-feedback/daily-feedback.module').then(
        m => m.DailyFeedbackModule
      )
  },
  {
    path: 'site',
    loadChildren: () =>
      import('./components/site/site.module').then(
        m => m.SiteModule
      )
  },
  {
    path: 'tank_product',
    loadChildren: () =>
      import('./components/tank-product/tank-product.module').then(
        m => m.TankProductModule
      )
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./components/auth/login/login-routing.module').then(
        m => m.LoginRoutingModule
      )
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./components/auth/register/register-routing.module').then(
        m => m.RegisterRoutingModule
      )
  },
  {
    path: 'user_list',
    loadChildren: () =>
      import('./components/auth/list/list-routing.module').then(
        m => m.ListRoutingModule
      )
  },
  {
    path: 'tank_product',
    loadChildren: () =>
      import('./components/tank-product/tank-product.module').then(
        m => m.TankProductModule
      )
  },
  {
    path: 'daily_feeding_approbation',
    loadChildren: () =>
      import('./components/daily-feedbacks-approbations/daily-feedbacks-approbations.module').then(
        m => m.DailyFeedbacksApprobationsModule
      )
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./components/auth/register/register.module').then(
        m => m.RegisterModule
      )
  },
  {
    path: 'home',
    component: HomeComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
