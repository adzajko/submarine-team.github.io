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
import { FourOhFourComponent } from './components/pages/four-oh-four/four-oh-four.component';
import { FullListComponent } from './components/reviews/full-list/full-list.component';
import { ReviewFullComponent } from './components/reviews/review-full/review-full.component';
import { ExtraOptions } from '@angular/router';

const routes: Routes = [
  { path: '', component: HomeComponent, data: { animationState: 'Home' } },
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
    path: 'my-account',
    component: MyAccountComponent,
    canActivate: [AuthGuardGuard],
    data: { animationState: 'MyAccount' }
  },
  {
    path: 'admin-panel',
    component: AdminPanelComponent,
    data: { animationState: 'Admin' },
    canActivate: [AuthGuardGuard]
  },
  // {
  //   path: 'reviews',
  //   component: FullListComponent,
  //    children: [{ path: ':id', component: ReviewFullComponent }]
  // },
  {
    path: 'terms-of-service',
    component: TermsOfServiceComponent,
    data: { animationState: 'TermsOfService' }
  },
  {
    path: '**',
    component: FourOhFourComponent,
    data: { animationState: 'NotFound' }
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'disabled' })
  ],
  exports: [RouterModule],
  providers: [AuthGuardGuard]
})
export class AppRoutingModule {}
