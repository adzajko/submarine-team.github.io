import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../../shared/company.service';
import { AuthService } from 'src/app/shared/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {
  companyList: any[] = [];

  constructor(
    public companyService: CompanyService,
    private auth: AuthService,
    private translate: TranslateService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.auth.showHTTPLoader(true);
    this.companyService.getCompanies().subscribe(
      item => {
        this.auth.showHTTPLoader(false);
        item.forEach(element => {
          this.companyList.push(element.payload.doc.data());
        });
        this.companyList = this.companyList.filter(
          (v, i, a) => a.findIndex(t => t.name === v.name) === i
        );
      },
      errorRes => {
        this.auth.showHTTPLoader(false);
        this.translate.get('TOASTR').subscribe(res => {
          this.toastr.error(errorRes.message, res.ERROR_TITLE);
        });
      }
    );
  }
  filterCompaniesByName(event: InputEvent) {
    const helperArray = this.companyList;
    const inputValue = event.target as HTMLInputElement;
    return helperArray.filter(e =>
      e.name.toLowerCase().includes(inputValue.value.toLowerCase())
    );
  }
}
