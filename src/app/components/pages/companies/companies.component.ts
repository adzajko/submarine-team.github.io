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
    const list: any[] = [];
    this.auth.showHTTPLoader(true);
    this.companyService.getCompanies().subscribe(
      item => {
        this.auth.showHTTPLoader(false);
        item.map(e => {
          list.push(e.payload.doc.data());
        });
      },
      errorRes => {
        this.translate.get('TOASTR').subscribe(res => {
          this.toastr.error(errorRes.message, res.ERROR_TITLE);
        });
      }
    );
    this.companyList = list;
  }

  render(comps) {
    console.log(comps);
  }
}
