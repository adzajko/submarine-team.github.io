import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}
  async canActivate() {
    //   if (await this.authService.authStateTrack()) {
    //     console.log('MOZES DA VLEZES ANGELU!');
    //     return true;
    //   } else {
    //     console.log('ZASTANI ZAD MENE SATANO!');
    //     this.router.navigate(['/']);
    //     return false;
    //   }
    // }

    const state = await this.authService.authStateTrack();
    if (state.logged) {
      if (state.verified) {
        return true;
      } else {
        this.toastr.error('You must verify your account before continuing!');
        return false;
      }
    } else {
      this.toastr.error('You are not logged in!');
      return false;
    }
  }
}
