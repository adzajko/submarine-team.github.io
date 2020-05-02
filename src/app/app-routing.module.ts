import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { AboutComponent } from './components/pages/about/about.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { MyAccountComponent } from './components/pages/my-account/my-account.component';
import { AdminPanelComponent } from './components/pages/admin-panel/admin-panel.component';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { CompaniesComponent } from './components/pages/companies/companies.component';
import { TermsOfServiceComponent } from './components/pages/terms-of-service/terms-of-service.component';

const routes: Routes = [
  { path: '', component: HomeComponent, data: { animationState: 'Home' } },
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
    path: 'my-account',
    component: MyAccountComponent,
    canActivate: [AngularFireAuthGuard],
    data: { animationState: 'About' }
  },
  {
    path: 'admin',
    component: AdminPanelComponent,
    data: { animationState: 'Contact' },
    canActivate: [AngularFireAuthGuard]
  },
  {
    path: 'companies',
    component: CompaniesComponent,
    data: { animationState: 'Contact' }
  },
  {
    path: 'terms-of-service',
    component: TermsOfServiceComponent,
    data: { animationState: 'About' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  providers: [AngularFireAuthGuard]
})
export class AppRoutingModule {}
