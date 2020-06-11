import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(
    private af: AngularFireAuth,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.af.onAuthStateChanged((user: firebase.User) => {
        if (user) {
          resolve(true);
        } else {
          this.router.navigate(['/']);
          resolve(false);
        }
      });
    });
  }
}
