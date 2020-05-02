import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { routeTransitionAnimations } from './shared/animations';
import { AuthService } from './shared/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { startWith, tap, delay } from 'rxjs/operators';
import { SharedService } from './shared/shared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeTransitionAnimations]
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'TSP';
  public pendingHttpRequest = false;
  private subscription: Subscription;
  public passLoggedStateInfo: boolean;

  shouldModalOpen = false;

  constructor(
    private auth: AuthService,
    private translateService: TranslateService,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    this.subscription = this.sharedService.publishLoginModalState.subscribe(
      response => {
        this.shouldModalOpen = response;
      }
    );
    this.auth.afAuth.user.subscribe(res => {
      if (res) {
        this.passLoggedStateInfo = true;
      } else {
        this.passLoggedStateInfo = false;
      }
    });
    this.auth.triggerLoadingScreen
      .pipe(startWith(null), delay(0))
      .subscribe(response => {
        this.pendingHttpRequest = response;
      });
    this.translateService.setDefaultLang('English');

    if (!localStorage.language) {
      localStorage.setItem('language', 'English');
    }
    this.translateService.use(localStorage.language);
  }

  prepareRoute(outlet: RouterOutlet): boolean {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData.animationState
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
