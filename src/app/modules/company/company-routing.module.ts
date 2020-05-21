import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CompaniesComponent } from 'src/app/components/pages/companies/companies.component';
import { CompanyFullPageComponent } from 'src/app/components/pages/companies/company-full-page/company-full-page.component';

const routes = [
  {
    path: 'companies',
    component: CompaniesComponent,
    data: { animationState: 'Companies' },
    children: [
      {
        path: ':id',
        component: CompanyFullPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'disabled' })
  ],
  exports: [RouterModule]
})
export class CompanyRoutingModule {}
