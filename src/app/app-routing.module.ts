import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { AboutComponent } from './components/pages/about/about.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { MyAccountComponent } from './components/pages/my-account/my-account.component';

import { AuthGuardGuard } from './shared/auth-guard.guard';

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
    data: { animationState: 'About' },
    canActivate: [AuthGuardGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
