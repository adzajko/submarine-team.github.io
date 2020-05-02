import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService,
    private translateService: TranslateService
  ) {}
  async canActivate() {
    const state = await this.authService.authStateTrack();
    if (state.logged) {
      if (state.verified) {
        return true;
      } else {
        this.translateService.get('TOASTR').subscribe(response => {
          this.toastr.error(response.UNVERIFIED, response.ERROR_TITLE);
        });
        return false;
      }
    } else {
      this.translateService.get('TOASTR').subscribe(response => {
        this.toastr.error(response.NOT_LOGGED_IN, response.ERROR_TITLE);
      });
      return false;
    }
  }
}
