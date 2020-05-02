import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(
    private af: AngularFireAuth,
    private router: Router,
    private toastrService: ToastrService,
    private translateService: TranslateService
  ) {}

  canActivate() {
    this.af.user.subscribe(res => {
      if (res && res.emailVerified) {
        console.log('YOU SPEAK DA TRU TRU');
        console.log(res);
        console.log(res.emailVerified);
        return true;
      } else {
        this.translateService.get('TOASTR').subscribe(response => {
          this.toastrService.error(response.UNVERIFIED, response.ERROR_TITLE);
        });
        console.log('DOnald Trump');
        console.log(res);
        return false;
      }
    });
    return false;
  }
}
