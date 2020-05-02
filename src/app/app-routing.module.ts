import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/pages/home/home.component';
import { MyAccountComponent } from './components/pages/my-account/my-account.component';
import { CompaniesComponent } from './components/pages/companies/companies.component';
import { AboutComponent } from './components/pages/about/about.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { AdminPanelComponent } from './components/pages/admin-panel/admin-panel.component';
import { TermsOfServiceComponent } from './components/pages/terms-of-service/terms-of-service.component';
import { AuthGuardGuard } from './shared/auth-guard.guard';

const routes: Routes = [
  { path: '', 
    component: HomeComponent, 
    data: { animationState: 'Home' } 
  },
  {
    path: 'my-account',
    component: MyAccountComponent,
    data: { animationState: 'MyAccount' },
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'companies',
    component: CompaniesComponent,
    data: { animationState: 'Companies' }
  },
  {
    path: 'about',
    component: AboutComponent,
    data: { animationState: 'About' }
  },
  {
    path: 'contact',
    component: ContactComponent,
    data: { animationState: 'Contact' }
  },
  {
    path: 'admin-panel',
    component: AdminPanelComponent,
    data: { animationState: 'Admin' },
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'terms-of-service',
    component: TermsOfServiceComponent,
    data: { animationState: 'TermsOfService' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
