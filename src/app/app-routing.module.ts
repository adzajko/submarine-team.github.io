import { LandingPageComponent } from './components/pages/landing-page/landing-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { MyAccountComponent } from './components/pages/my-account/my-account.component';
import { AboutComponent } from './components/pages/about/about.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { AdminPanelComponent } from './components/pages/admin-panel/admin-panel.component';
import { TermsOfServiceComponent } from './components/pages/terms-of-service/terms-of-service.component';
import { AuthGuardGuard } from './shared/auth-guard.guard';
import { FourOhFourComponent } from './components/pages/four-oh-four/four-oh-four.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'my-account',
    component: MyAccountComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'admin-panel',
    component: AdminPanelComponent,

    canActivate: [AuthGuardGuard]
  },
  {
    path: 'terms-of-service',
    component: TermsOfServiceComponent
  },
  {
    path: '**',
    component: FourOhFourComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule],
  providers: [AuthGuardGuard]
})
export class AppRoutingModule {}
