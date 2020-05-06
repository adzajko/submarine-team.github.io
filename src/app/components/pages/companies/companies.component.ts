import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../../shared/company.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss'],
})
export class CompaniesComponent implements OnInit {
  companyList: any[] = [];
  constructor(public companyService: CompanyService) {}

  ngOnInit(): void {
    const list: any[] = [];
    this.companyService.getCompanies().subscribe((item) => {
      item.map((e) => {
        list.push(e.payload.doc.data());
      });
    });
    this.companyList = list;
  }

  render(comps) {
    console.log(comps);
  }
}
