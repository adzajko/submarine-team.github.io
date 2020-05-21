import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyFullPageComponent } from 'src/app/components/pages/companies/company-full-page/company-full-page.component';
import { CompaniesComponent } from 'src/app/components/pages/companies/companies.component';
import { CompanyRoutingModule } from './company-routing.module';
import { ComponentListItemComponent } from 'src/app/shared/component-list-item/component-list-item.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    CompanyFullPageComponent,
    CompaniesComponent,
    ComponentListItemComponent
  ],
  imports: [CommonModule, CompanyRoutingModule, SharedModule],
  exports: [
    CompanyRoutingModule,
    CompanyFullPageComponent,
    CompaniesComponent,
    ComponentListItemComponent
  ]
})
export class CompanyModule {}
